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
//        URL : '',
//        
//        redefinitionAllowed : false,
//        
//        externalLoading : null,
//        interval : null,
    
        loading : { init : false },
        loaded : { init : false },
//        declared : false,
        ready : { init : false },
        readyListeners : {},
//        anonymous : false,
    
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
    			
    			cur = cur.caller;
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

            if (props && props.use) {
                //satisfy dependencies 1st
                var depInfo = props.use;
                delete props.use;
                
                //unshift is critical for correct order of readyListerens processing 
                element.meta.readyListeners.unshift(function(){
                    var body = props.body;
                    delete props.body;
                    
                    element.meta.initializeFromProps(props)
                    
                    element.meta._initializeFromProp('body', body, props)
                });
                
                element.meta._initializeFromProp('use', depInfo, props)
            } else {
                element.meta.initializeFromProps(props)
            }
        	
        	return element;
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
    
    
    methods: {
    	
		handlePropbody : function (bodyFunc) {
			if (bodyFunc) Joose.Kernel.Namespace.executeInNamespace(this.nextGeneration, bodyFunc, this.nextGeneration, [this.nextGeneration]);
		},
        

        handlePropversion : function (version) {
            this.version = version;
        },
        
        
        handlePropuse : function (dependenciesInfo, props) {
            //we are scoping this method call not to usual "this", but to "this namespace"
            //this is related to the fact, that during loading, the Module can be promoted to the class, and the instance of meta 
            //will change, but the class function itself will remain untouched
            //this is also used in others places in the code
            var thisNamespace = this.nextGeneration;
            
            if (!(dependenciesInfo instanceof Array)) dependenciesInfo = [ dependenciesInfo ];
            
            Joose.A.each(dependenciesInfo, function(dependency) {
                //turning into dependency descriptor if necessary
                if (typeof dependency == 'string') dependency = { Module : dependency };
                
                var depName = dependency.Module;
                if (!depName) throw "Empty dependency name for Module=[" + thisNamespace + "]";
                
                if (thisNamespace.meta.dependencies[depName] && thisNamespace.meta.dependencies[depName].version != dependency.version) {
                    throw "Repeated usage of " + dependency.Module + " with different version number for Module=[" + thisNamespace + "]";
                }
                
                
                if (!thisNamespace.meta.dependencies[depName]) {

                    //dependencies are always calculating from global namespace
                    dependency.Module = Joose.Kernel.Namespace.executeInNamespace(__global__, function(){
                        //turning string into Namespace instance, optionally creating new namespace
                        return Joose.Kernel.Namespace.prepareNamespace(dependency.Module);
                    });
                    
                    //if the dependency is not ready (even if it already loaded) - we need to monitor it
                    if (!dependency.Module.meta.ready) {
                    
                        //pushing listener to the end(!) of the list
                        dependency.Module.meta.readyListeners.push(function(){
                            
                            if (dependency.version) {
                                if (!dependency.Module.meta.version) throw "Loaded dependency " + dependency.Module + " has no specified version. Required version is: " + dependency.version;
                                
                                if (dependency.Module.meta.version < dependency.version) 
                                    throw "Loaded dependency " + dependency.Module + " has lower version [" + dependency.Module.meta.version + "] than required [" + dependency.version + "]";
                            }
                            
                            delete thisNamespace.meta.dependencies[depName];
                            thisNamespace.meta.checkDependencies();
                        });
                        thisNamespace.meta.dependencies[depName] = dependency;
                    }
                }
            })
            
            Joose.O.eachSafe(thisNamespace.meta.dependencies, function(dependency, Module) {
                dependency.Module.meta.handleLoad();
            })
            
            thisNamespace.meta.checkDependencies();
        },
        
        
        checkDependencies : function (){
            for (var i in this.dependencies) return;
            
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
        
        
        getUrl : function () {
//            if (this.URL) return this.URL;
            
            var s = this._name.split('.');
            s = __JOOSE_LIB_ROOT__.concat(s);
            
            return s.join('/') + '.js';
        },
      
        
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
            
            this.load(function(){
                thisNamespace.meta.loaded = true;
                thisNamespace.meta.loading = false;
                thisNamespace.meta.checkDependencies();
            });
        },
        
        
        load : function (ready) {
            var loaderNode = document.createElement("script");
            
            loaderNode.onload = loaderNode.onreadystatechange = function() {
                if (!loaderNode.readyState || loaderNode.readyState == "loaded" || loaderNode.readyState == "complete" || loaderNode.readyState == 4 && loaderNode.status == 200) {
                    //surely for IE6..
                    setTimeout(function(){ ready() }, 1);
                }
            };
            
            loaderNode.setAttribute("type", "text/javascript");
            loaderNode.setAttribute("src", this.getUrl());
            document.getElementsByTagName("head")[0].appendChild(loaderNode);
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

//XXX should be better place to keep this info (class attribute?)
__JOOSE_LIB_ROOT__ = ['libroot'];