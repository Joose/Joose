var protoModuleMeta = new Joose.Kernel.Roles('Joose.Kernel.ProtoModule');

protoModuleMeta.initializeFromProps({
	
	isa : Joose.Kernel.Roles,
	
    has: {
    	//namespace can be filled only by Class (and only one), Module doesnt fill the namespace 
    	namespaceFilled : { init : false },
    	
    	localName : {},
    	
        namespaceElements: {},
        
        //place where the namespace elements are stored. Generally its a nextGeneration function, but for global module it will be a joose.top
        container: { is : 'rw' }
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
    		return this
    	},
    	
        
    	//prepares the namespace except the last chain
        prepareNamespace: function (name) {
            var parts   = name.split(".");
            var object  = __JOOSE_MODULE__;
            var soFar   = __JOOSE_MODULE__.meta.getName().split(".");
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
                    var module = (new this.getNamespaceFiller()(name)).getClassObject();
                    object.meta.addElement(module);
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
        
        
        //namespace conflict resolution function (filling the namespace which is already filled by smth)
        fillOwnNamespace : function (parent, element, globalName) {
        	//module do not confict with already declared things
        },
        
        
        create : function (name, props){
        	var res = this.prepareNamespace(name);
        	
        	var element = res.parent.meta.container[res.localName];
        	
        	if (element) {
        		if (!element.meta) throw "Trying to setup module " + res.globalName + " failed. There is already something not related to Joose there: " + element
        		if (!element.meta.meta.isa(Joose.Kernel.ProtoModule)) throw "Trying to setup module " + res.globalName + " failed. There is already something: "+element
        		
        		this.fillOwnNamespace(parent, element, res.globalName)
        	} else {
        		element = (new this(res.globalName)).getClassObject();
        		
        		res.parent.meta.addElement(element);
        	}
        	
        	
        	element.meta.initializeFromProps(props)
        }
        
    },
    
    
    before : {
    	
	    addClassMethod : function (name, func) {
	        if (this.namespaceElements.hasOwnProperty(name) && this.namespaceElements[name]) 
	        	throw "Collision between existing namespace element  [" + this.namespaceElements[name] + "] and a new classMethod [" + name + "]";
	    }
    },
    
    
    methods: {
    	
		defaultClassFunctionBody: function () {
		    return function () {
		        if (!this.meta.namespaceFilled) throw new Error("Modules may not be instantiated.")
		        this.initialize.apply(this, arguments);
		    };
		},
    	
		
		handlePropbody : function (bodyFunc) {
			with ({ __JOOSE_MODULE__ : this.nextGeneration}) bodyFunc.call(this.nextGeneration, this.nextGeneration)
		},
        
		
        alias: function (destination) {
            if (!(destination && destination.meta && destination.meta.meta && destination.meta.meta.can('addElement'))) return this;
            
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
        
        
        addElement: function (ele) {
            if (!(ele && ele.meta)) throw "You may only add things that are Joose objects"
            if (this.classCan(ele.meta.localName)) throw "Collision between existing classMethod [" + ele.meta.localName + "] of " + this + " and a new namespace element [" + ele + "]";
            
            this.namespaceElements[ele.meta.localName] = ele;
            this.container[ele.meta.localName] = ele;
        }
        
//        getNames: function () {
//            var names = [];
//            Joose.A.each(this.namespaceElements, function (ele) { names.push(ele.meta.getName()) });
//            return names
//        }
    }
});


    
Joose.Kernel.ProtoModule = protoModuleMeta.getClassObject();


__JOOSE_MODULE__ = (new Joose.Kernel.ProtoModule("__global__")).getClassObject();
__JOOSE_MODULE__.meta.setContainer(joose.top);


new Joose.Kernel.ProtoModule("Joose", Joose);
new Joose.Kernel.ProtoModule("Joose.Kernel", Joose.Kernel);

//__global__ = Joose.Kernel.ProtoModule.setup("__global__");
//__global__.meta.setContainer(__global__);
//__global__.meta._allModules.push(__global__);
//
//
//Joose.Kernel.ProtoModule.setup("__global__.nomodule", function () {});
//__global__.nomodule.meta._elements = joose.globalObjects;


