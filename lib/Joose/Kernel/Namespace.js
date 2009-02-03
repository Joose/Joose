var namespaceMeta = new Joose.Kernel.Handlers('Joose.Kernel.Namespace');

namespaceMeta.initializeFromProps({
	
	isa : Joose.Kernel.Handlers,
	
    has: {
    	parent : {},
    	
    	localName : {},
    	
        namespaceElements: {},
        
        //place where the namespace elements are stored. Generally its a nextGeneration function, but for global module it will be a joose.top
        container: {}
    },
    
    after : {
        initialize : function (name, nextGeneration) {
            this.namespaceElements = {};
            this.localName = name.split(".").pop();
            this.container = this.nextGeneration;
        }
    },
    
    
    classMethods: {
    	
    	getCurrentNamespace : function (){
    		var limit = 50;
    		var cur = arguments.callee.caller;
    		
    		while (cur && limit) {
    			if (cur.__JOOSE_MODULE__) return cur.__JOOSE_MODULE__;
    			
    			cur = cur.caller;
    			limit--;
    		}
    		
    		//cur == null - we have reached the outer space )
    		if (limit) return __global__;
    		
    		throw "getCurrentNamespace() failed with limit=" + limit;
    	},
    	
    	
    	//prepares the namespace except the last chain
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
                    var moduleMeta = new this(name);
                    moduleMeta.addSuperClass(this);
                    moduleMeta.addMethod('defaultClassFunctionBody', function () {
					    return function () {
					        throw new Error("Modules may not be instantiated.")
					    };
					});
                    
                    object.meta.addElement(moduleMeta.getClassObject());
                } else {
                    if(!(cur && cur.meta && cur.meta.meta && cur.meta.meta.isa(Joose.Kernel.Namespace))) {
                        throw "Trying to setup module "+name+" failed. There is already something: "+cur
                    }
                }
                object = object.meta.container[part];
            }
            
            return object
        }
        
    },
    
    
    before : {
	    addClassMethod : function (name, func) {
	        if (this.hasElement(name)) throw "Collision between existing namespace element  [" + this.namespaceElements[name] + "] and a new classMethod [" + name + "]";
	    }
    },
    
    
    methods: {
    	
		handlePropbody : function (bodyFunc) {
			var namespaceKeeper = function (bodyFunc, nameSpace) {
				arguments.callee.__JOOSE_MODULE__ = nameSpace;
				bodyFunc.call(nameSpace, nameSpace)
			};
			
			namespaceKeeper(bodyFunc, this.nextGeneration)
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
        	return this.namespaceElements.hasOwnProperty(name) && this.namespaceElements[name] || null;
        },
        
        
        addElement: function (ele) {
            if (!(ele && ele.meta && ele.meta.meta && ele.meta.meta.hasAttribute('localName'))) throw "You may only add things that are Joose objects"
            
            var localName = ele.meta.localName;
            
            if (this.classCan(localName)) throw "Collision between existing classMethod [" + localName + "] of " + this + " and a new namespace element [" + ele + "]";
            if (this.hasElement(localName) && this.container[localName] != ele) 
            	throw "Adding namespace element failed: namespace element [" + localName + "] already exists in the [" + this.nextGeneration + "]";
            
            this.namespaceElements[localName] = ele;
            this.container[localName] = ele;
            ele.meta.parent = this.nextGeneration;
        },
        
        
        removeElement : function (ele) {
        	if (!(ele && ele.meta && ele.meta.meta && ele.meta.meta.hasAttribute('localName'))) throw "You may only remove things that are Joose objects"
        	var localName = ele.meta.localName;
        	
            delete this.namespaceElements[localName];
            delete this.container[localName];
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


__global__ = (new Joose.Kernel.Namespace("")).getClassObject();
__global__.meta._name = '';
__global__.meta.container = joose.top;

new Joose.Kernel.Namespace("Joose", Joose);
new Joose.Kernel.Namespace("Joose.Kernel", Joose.Kernel);