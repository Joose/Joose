var namespaceMeta = new Joose.Kernel.Handlers('Joose.Kernel.Namespace');

namespaceMeta.initializeFromProps({
	
	isa : Joose.Kernel.Handlers,
	
    has: {
    	parent : {},
    	
    	localName : {},
    	
        namespaceElements: {},
        
        //place where the namespace elements are stored. Generally its a nextGeneration function (getClassObject()), but for global module it will be a joose.top
        container: {},
        
        externalConstructor : {},
        
        version : {},
//        evalStr : '',
        url : {},
        loading : { init : false },
        loaded : { init : false },
        ready : { init : false },
        readyListeners : {},
        transport : { init : 'ajaxAsync' },
        
        BEGIN : {},
        beginStarted : { init : false },
    
        //object with dependency descriptors
        dependencies : {}
    },
    
    after : {
        initialize : function (name, nextGeneration) {
            this.namespaceElements = {};
            this.localName = name.split(".").pop();
            this.container = this.nextGeneration;
            
            this.dependencies = {};
            this.readyListeners = [];
        }
    },
    
    
    classMethods: {
    	
    	getCurrentNamespace : function (){
    		var limit = 50;
    		var msg = "getCurrentNamespace() failed with limit=" + limit;
    		var cur = arguments.callee.caller;
    		
    		while (cur && limit) {
    			if (cur.__JOOSE_MODULE__) return cur.__JOOSE_MODULE__;
    			
    			try {
                    cur = cur.caller;
                } catch (e) {
                    cur = null
                }
    			limit--;
    		}
    		
    		//cur == null - we have reached the outer space )
    		if (limit) return __global__;
    		
    		throw msg;
    	},
    	
    	
        prepareNamespace: function (name) {
            var parts   = name.split(".");
            if (parts.length && !parts[0]) parts.shift();
            
            if (!parts.length) throw "Cant prepare namespace with empty name = [" + name + "]"; 
            
            var object  = this.getCurrentNamespace();
            var soFar   = object.meta.getName().split(".");
            //workaround for "When the string is empty, split returns an array containing one empty string, rather than an empty array."
            if (soFar.length && !soFar[0]) soFar.shift();
            
            for(var i = 0; i < parts.length; i++) {
                var part = parts[i];
                
                if(part == "meta") throw "Module names may not include a part called 'meta'."
                if(!part) throw "Module names may not include an empty part."
                
                soFar.push(part)
                var name = soFar.join(".")
                
                var cur = object.meta.container[part];
                if(typeof cur == "undefined") {
                    object.meta.addElement(new Joose.Kernel.NamespaceKeeper(name).getClassObject());
                } else {
                    //XXX should we try to quietly setup a meta (Joose.Kernel.NamespaceKeeper instance) if its absent?
                    if(!(cur && cur.meta && cur.meta.meta && cur.meta.meta.isa(Joose.Kernel.Namespace))) {
                        throw "Trying to setup module "+name+" failed. There is already something: "+cur
                    }
                }
                object = object.meta.container[part];
            }
            
            return object
        },
        
        
        create : function (name, props){
        	//last element in namespace chain
            var element = Joose.Kernel.Namespace.prepareNamespace(name)

            element.meta.initializeFromProps(props)
        	
        	return element;
        },
        
        
        use : function (dependenciesInfo, callback, scope) {
            var anonymousNamespace = new Joose.Kernel.Namespace('').getClassObject();
            anonymousNamespace.meta.initializeFromProps({
                use : dependenciesInfo,
                body : function (){
                    callback.call(scope || this);
                }
            });
        },
        
        
        executeInNamespace : function (nameSpace, func, scope, argsArray) {
			var namespaceKeeper = function (func, nameSpace) {
				arguments.callee.__JOOSE_MODULE__ = nameSpace;
				return func.apply(scope || this, argsArray || []);
			};
			
			return namespaceKeeper(func, nameSpace)
        }
        
        
    },
    
    
    before : {
	    addClassMethod : function (name, func) {
	        if (this.hasElement(name)) throw "Collision between existing namespace element [" + this.namespaceElements[name] + "] and a new classMethod [" + name + "]";
	    }
    },
    
    
    override : {
        initializeFromProps : function(props) {
            var thisNamespace = this.nextGeneration;
            
            //if we are initializing from props, then we consider that we are loaded
            this.loaded = true;

            if (props && props.use) {
                //but not ready, since there are depedencies to load                
                this.ready = false;
                
                //satisfy dependencies 1st
                var depInfo = props.use;
                delete props.use;
                
                //unshift is critical for correct order of readyListerens processing 
                thisNamespace.meta.readyListeners.unshift(function(){
                    var body = props.body;
                    delete props.body;
                    
                    thisNamespace.meta.initializeFromProps(props)
                    
                    thisNamespace.meta._initializeFromProp('body', body, props)
                });
                
                thisNamespace.meta._initializeFromProp('BEGIN', props.BEGIN, props)
                delete props.BEGIN;
                
                thisNamespace.meta._initializeFromProp('use', depInfo, props)
            } else {
                return this.SUPER(props)
            }
        }
    },
    
    methods: {
    	
		//BEGIN executes right after the all dependencies are loaded, but before this module becomes ready
        //this allows to manually control the "ready-ness" of module
        //BEGIN receives the function (callback), which should be called at the end of custom processing 
        handlePropBEGIN : function (begin, props) {
            if (this.BEGIN) throw "Double declaration of BEGIN property for module=[" + this.nextGeneration + "]"
            
            this.BEGIN = begin;
        },
        
        
        handlePropbody : function (bodyFunc) {
			if (bodyFunc) Joose.Kernel.Namespace.executeInNamespace(this.nextGeneration, bodyFunc, this.nextGeneration, [this.nextGeneration]);
		},
        

        handlePropversion : function (version) {
            this.version = version;
        },
        
        
        dependsFrom : function (module) {
            //quick scan
            for (var name in this.dependencies)
                if (this.dependencies.hasOwnProperty(name)) {
                    if (this.dependencies[name].Module == module) return true    
                }
                
            //in-depth scan                
            for (name in this.dependencies)
                if (this.dependencies.hasOwnProperty(name)) {
                    if (this.dependencies[name].Module.meta.dependsFrom(module)) return true    
                }
            
            return false;
        },
        
        
        prepareDependencyDescriptor : function (thisNamespace, descriptor) {
            //turning into object if necessary
            if (typeof descriptor == 'string') descriptor = { Module : descriptor };
            
            if (descriptor.Module && descriptor.url) throw "Dependency of [" + thisNamespace + "] from external url=[" + descriptor.url + "], can't have Module defined [" + descriptor.Module + "]";
            
            var depName = descriptor.Module || descriptor.url;
            if (!depName) throw "Empty dependency name for Module=[" + thisNamespace + "]";
            
            descriptor.depName = depName;
            
            if (thisNamespace.meta.dependencies[depName] && thisNamespace.meta.dependencies[depName].version != descriptor.version) {
                throw "Repeated usage of " + depName + " with different version number for Module=[" + thisNamespace + "]";
            }
            
            if (!thisNamespace.meta.dependencies[depName]) {
                
                if (descriptor.Module) {
                    //dependencies are always calculating from global namespace
                    descriptor.Module = Joose.Kernel.Namespace.executeInNamespace(__global__, function(){
                        //turning string into Namespace instance, optionally creating new namespace
                        return Joose.Kernel.Namespace.prepareNamespace(descriptor.Module);
                    });
                    
                    if (descriptor.transport) {
                        if (descriptor.Module.meta.hasOwnProperty('transport') && descriptor.Module.meta.transport != descriptor.transport) 
                            throw "Error : redeclaration of transport property for Module=[" + thisNamespace + "]";
                            
                        descriptor.Module.meta.transport = descriptor.transport;
                    }
                } else {
                    descriptor.Module = new Joose.Kernel.Namespace('').getClassObject();
                    descriptor.Module.meta.url = descriptor.url;
                    descriptor.Module.meta.transport = 'script';
                }

                //hung out browsers with slow js-engines (chrome and safari 3 are ok)  
                if (__JOOSE_DETECT_DEADLOCKS__ && descriptor.Module.meta.dependsFrom(thisNamespace)) throw "Cyclic reference detected between: [" + thisNamespace + "] and [" + descriptor.Module + "]";
            }
            
            return descriptor;
        },
        
        
        handlePropuse : function (dependenciesInfo, props) {
            //we are scoping this method call not to usual "this", but to "this namespace"
            //this is related to the fact, that during loading, the Module can be promoted to the class, and the instance of meta 
            //will change, but the class function itself will remain untouched
            //this is also used in others places in the code
            var thisNamespace = this.nextGeneration;
            
            if (!(dependenciesInfo instanceof Array)) dependenciesInfo = [ dependenciesInfo ];
            
            Joose.A.each(dependenciesInfo, function(descriptor) {
                
                descriptor = thisNamespace.meta.prepareDependencyDescriptor(thisNamespace, descriptor);
                var depName = descriptor.depName;
                
                if (!thisNamespace.meta.dependencies[depName]) {

                    //if the descriptor is not ready (even if its already loaded) - we need to monitor it
                    if (!descriptor.Module.meta.ready) {
                    
                        //pushing listener to the end(!) of the list
                        descriptor.Module.meta.readyListeners.push(function(){
                            
                            if (descriptor.version) {
                                if (!descriptor.Module.meta.version) throw "Loaded descriptor " + descriptor.Module + " has no specified version. Required version is: " + descriptor.version;
                                
                                if (descriptor.Module.meta.version < descriptor.version) 
                                    throw "Loaded descriptor " + descriptor.Module + " has lower version [" + descriptor.Module.meta.version + "] than required [" + descriptor.version + "]";
                            }
                            
                            delete thisNamespace.meta.dependencies[depName];
                            thisNamespace.meta.checkDependencies();
                        });
                        thisNamespace.meta.dependencies[depName] = descriptor;
                    }
                }
            })
            
            Joose.O.eachSafe(thisNamespace.meta.dependencies, function(descriptor) {
                descriptor.Module.meta.handleLoad();
            })
            
            thisNamespace.meta.checkDependencies();
        },
        
        
        checkDependencies : function (){
            for (var i in this.dependencies) if (this.dependencies.hasOwnProperty(i)) return;
            
            if (this.BEGIN) {
                if (!this.beginStarted) {
                    this.beginStarted = true;
                    
                    var me = this;
                    
                    this.BEGIN.call(this.nextGeneration, function(){
                        me.beginStarted = false;
                        delete me.BEGIN;
                        
                        me.fireReady();
                    });
                    
                }
            } else 
                this.fireReady();
        },
        
        
        fireReady : function(){
            this.ready = true;
            
            var listeners = this.readyListeners;
            this.readyListeners = [];
            
            Joose.A.each(listeners, function(listener){
                listener();
            });
        },
        
        
        getUrls : function () {
            if (this.url) return typeof this.url == 'function' ? this.url() : this.url;
            
            var urls = [];
            var className = this._name.split('.');
            
            Joose.A.each(__JOOSE_INC__, function (libroot) {
                urls.push(libroot.concat(className).join('/') + '.js');
            });
            
            
            return urls;
        },
      
        
        //XXX probably will be replaced with simple this.loaded
        isLoaded : function (){
            if (this.ready || this.loaded) return true;
            
            return false;
        },
        
        
        handleLoad : function() {
            var thisNamespace = this.nextGeneration;
            
            if (this.isLoaded()) {
                this.checkDependencies();
                return;
            }
            
            if (this.loading) return;
            this.loading = true;
            
            var urls = this.getUrls();
            if (!(urls instanceof Array)) urls = [ urls ];
            
            var onready = function() {
                thisNamespace.meta.loaded = true;
                thisNamespace.meta.loading = false;
                thisNamespace.meta.checkDependencies();
            }
            
            var onerror = function(){


                //if no more urls
                if (!urls.length) throw "Module=[" + thisNamespace + "] not found";
                
                Joose.Kernel.Namespace.transports[thisNamespace.meta.transport].call(thisNamespace.meta, urls.shift(), onready, onerror);
            }
            
            //to avoid cycled recursion in getNamespace()
            onerror.__JOOSE_MODULE__ = __global__;
            
            Joose.Kernel.Namespace.transports[this.transport].call(this, urls.shift(), onready, onerror);
        },
        
        
        alias: function (destination) {
            if (!(destination && destination.meta && destination.meta.meta && destination.meta.meta.can('addElement'))) throw "Alias supported only for objects, which metas can addElement";
            
            for (var i in this.namespaceElements) {
            	if (this.namespaceElements.hasOwnProperty(i)) {
        			destination.meta.addElement(this.namespaceElements[i]);
            	}
            }
            
            return this;
        },
        
        
        hasElement : function (name) {
        	return this.namespaceElements.hasOwnProperty(name) && Boolean(this.namespaceElements[name]);
        },
        
        
        getElement : function(name) {
        	//not IE
        	if (typeof this.container.hasOwnProperty == 'function') {
        		return this.container.hasOwnProperty(name) && this.container[name] || null;
        	}
        	
        	//window in IE has no hasOwnProperty
        	return this.container[name]
        },
        
        
        addElement: function (ele) {
            if (!(ele && ele.meta && ele.meta.meta && ele.meta.meta.hasAttribute('localName'))) throw "You may only add things that are Joose objects"
            
            var localName = ele.meta.localName;
            
            if (this.classCan(localName)) throw "Collision between existing classMethod [" + localName + "] of " + this + " and a new namespace element [" + ele + "]";
            if (this.getElement(localName) && this.getElement(localName) != ele) 
            	throw "Adding namespace element failed: namespace element [" + localName + "] already exists in the [" + this.nextGeneration + "]";
            
            this.namespaceElements[localName] = ele;
            this.container[localName] = ele;
            ele.meta.parent = this.nextGeneration;
        },
        
        
        removeElement : function (ele) {
        	if (!(ele && ele.meta && ele.meta.meta && ele.meta.meta.hasAttribute('localName'))) throw "You may only remove things that are Joose objects"
        	var localName = ele.meta.localName;
        	
            delete this.namespaceElements[localName];
            try {
            	delete this.container[localName];
            } catch (e) {
            	//IE messing
            	this.container[localName] = undefined;
            }
            delete ele.meta.parent
        },
        
        
        getElementNames: function () {
            var names = [];
            Joose.O.eachSafe(this.namespaceElements, function (value, prop) { names.push(prop) });
            return names
        }
    }
});

    
Joose.Kernel.Namespace = namespaceMeta.getClassObject();

use = function(){
    Joose.Kernel.Namespace.use.apply(Joose.Kernel.Namespace, arguments);
}

//XXX should be better place to keep this info (class attributes?)
__JOOSE_INC__ = [ ['libroot'], ['libroot2'] ];
__JOOSE_DETECT_DEADLOCKS__ = false;


Joose.Kernel.Namespace.transports = {
    
    script : function (url, onready, onerror) {
        var loaderNode = document.createElement("script");
        
        loaderNode.onload = loaderNode.onreadystatechange = function() {
            if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200) {
                //surely for IE6..
                setTimeout(function(){ onready() }, 1);
            }
        };
        
        loaderNode.setAttribute("type", "text/javascript");
        loaderNode.setAttribute("src", url);
        document.getElementsByTagName("head")[0].appendChild(loaderNode);
    },
    
    
    ajaxAsync : function (url, onready, onerror) {
        var req = new Joose.SimpleRequest();
        
        try {
            req.getText(url, true, function(success, text){
                if (!success) { onerror(); return }
                
                eval(text);
                
                onready();
            });
        } catch (e) {
            onerror();
        }
    },
    
    
    ajaxSync : function (url, onready, onerror) {
        var req = new Joose.SimpleRequest();
        var text; 
        
        try {
            text = req.getText(url);
        } catch (e) {
            onerror();
        }
        
        eval(text);
        onready();
    }
    
}
