var protoModuleMeta = new Joose.Kernel.Handlers('Joose.Kernel.ProtoModule');

protoModuleMeta.initializeFromProps({
	
	isa : Joose.Kernel.Handlers,
	
	//XXX no parent namespace reference for now
    has: {
    	attributeConstructor : { init : Joose.Kernel.AdvancedProtoAttribute, lazy : true },
    	
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
    	
    	getNamespaceFiller : function () {
    		return Joose.Kernel.ProtoModule
    	},
    	
        
    	getCurrentNamespace : function (){
    		var limit = 50;
    		var cur = arguments.callee.caller;
    		
    		while (cur && limit) {
    			if (cur.__JOOSE_MODULE__) return cur.__JOOSE_MODULE__;
    			
    			cur = cur.caller;
    			limit--;
    		}
    		
    		//cur == null - we reached the outer space )
    		if (limit) return __global__;
    		
    		throw "getCurrentNamespace() failed with limit=" + limit;
    	},
    	
    	
    	//prepares the namespace except the last chain
        prepareNamespace: function (name) {
            var parts   = name.split(".");
            var object  = this.getCurrentNamespace();
            var soFar   = object.meta.getName().split(".");
            //workaround for "When the string is empty, split returns an array containing one empty string, rather than an empty array."
            if (soFar.length && !soFar[0]) soFar.shift();
            
            for(var i = 0; i < parts.length - 1; i++) {
                var part = parts[i];
                
                if(part == "meta") throw "Module names may not include a part called 'meta'."
                if(!part) throw "Module names may not include an empty part."
                
                soFar.push(part)
                var name = soFar.join(".")
                
                var cur = object.meta.container[part];
                if(typeof cur == "undefined") {
                    var moduleMeta = new (this.getNamespaceFiller())(name);
                    moduleMeta.addSuperClass(this.getNamespaceFiller());
                    
                    object.meta.addElement(moduleMeta.getClassObject());
                } else {
                    if(!(cur && cur.meta && cur.meta.meta.isa(Joose.Kernel.ProtoModule))) {
                        throw "Trying to setup module "+name+" failed. There is already something: "+cur
                    }
                }
                object = object.meta.container[part];
            }
            
            soFar.push(parts[parts.length - 1])
            
            return { parent : object, globalName : soFar.join("."), localName : parts[parts.length - 1] }
        },
        
        
        create : function (name, props, nameSpace){
        	var res = this.prepareNamespace(name);
        	
        	var parent  = res.parent;
        	var element = parent.meta.container[res.localName];
        	
        	
        	if (element) {
        		if (!element.meta) throw "Trying to setup module " + res.globalName + " failed. There is already something not related to Joose there: " + element
        		if (!element.meta.meta.isa(Joose.Kernel.ProtoModule)) throw "Trying to setup module " + res.globalName + " failed. There is already something: "+element
        		
        		if (element.meta.classCan('getNamespaceFiller') && element == element.getNamespaceFiller()) {
        		
	        		var aClass = (new this(res.globalName)).getClassObject();
	        		element.meta.alias(aClass);
	        		
	        		parent.meta.addElement(aClass);
        		}
        		
        	} else {
        		element = (new this(res.globalName)).getClassObject();
        		
        		parent.meta.addElement(element);
        	}
        	
        	
        	element.meta.initializeFromProps(props)
        	
        	return element;
        }
        
    },
    
    
    before : {
    	
	    addClassMethod : function (name, func) {
	        if (this.hasElement(name)) throw "Collision between existing namespace element  [" + this.namespaceElements[name] + "] and a new classMethod [" + name + "]";
	    }
    },
    
    
    methods: {
    	
		defaultClassFunctionBody: function () {
		    return function () {
		        if (this.constructor == this.meta.constructor.getNamespaceFiller()) throw new Error("Modules may not be instantiated.")
		        this.initialize.apply(this, arguments);
		    };
		},
    	
		
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
        
        
//        globalName: function (name) {
//            var moduleName = this.getName();
//            if(name.indexOf(moduleName) != 0) {
//                throw "All things inside me should have a name that starts with "+moduleName+". Name is "+name
//            }
//            var rest = name.substr(moduleName.length + 1); // + 1 to remove the trailing dot
//            if(rest.indexOf(".") != -1) {
//                throw "The things inside me should have no more dots in there name. Name is "+rest
//            }
//            return rest
//        },
        
        
//        removeGlobalSymbols: function () {
//            Joose.A.each(this.getElements(), function (thing) {
//                var global = this.globalName(thing.getName());
//                delete joose.top[global]
//            })
//        },
//        
//        
//        isEmpty: function () {
//            return this.getElements().length == 0
//        },
        
        
        hasElement : function (name) {
        	return this.namespaceElements.hasOwnProperty(name) && this.namespaceElements[name];
        },
        
        
        addElement: function (ele) {
            if (!(ele && ele.meta && ele.meta.meta && ele.meta.meta.hasAttribute('localName'))) throw "You may only add things that are Joose objects"
            
            var localName = ele.meta.localName;
            
            if (this.classCan(localName)) throw "Collision between existing classMethod [" + localName + "] of " + this + " and a new namespace element [" + ele + "]";
            if (this.hasElement(localName) && this.container[localName] != ele) throw "Adding namespace element failed: namespace element  [" + localName + "] already exists";
            
            this.namespaceElements[localName] = ele;
            this.container[localName] = ele;
        }
        
//        getNames: function () {
//            var names = [];
//            Joose.A.each(this.namespaceElements, function (ele) { names.push(ele.meta.getName()) });
//            return names
//        }
    }
});


    
Joose.Kernel.ProtoModule = protoModuleMeta.getClassObject();


__global__ = (new Joose.Kernel.ProtoModule("")).getClassObject();
__global__.meta._name = '';
__global__.meta.container = joose.top;
__global__.meta.namespaceFilled = false;

new Joose.Kernel.ProtoModule("Joose", Joose);
new Joose.Kernel.ProtoModule("Joose.Kernel", Joose.Kernel);

//__global__ = Joose.Kernel.ProtoModule.setup("__global__");
//__global__.meta.setContainer(__global__);
//__global__.meta._allModules.push(__global__);
//
//
//Joose.Kernel.ProtoModule.setup("__global__.nomodule", function () {});
//__global__.nomodule.meta._elements = joose.globalObjects;


