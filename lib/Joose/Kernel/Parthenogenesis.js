//parthenogenesisMeta will separate meta and parent classes
var parthenogenesisMeta = new Joose.Kernel.Gene(function(nextGeneration) {
    //this is the actual separation - see below for overriden initialize method
    this.initialize.apply(this, arguments);
    
    //During instnatiation Parthenogenesis needs to introspect itself, so it uses an ancient "initialize" method from previous propagation model in own scope
    //this is a "proto-analog" for calling parent's constructor
    this.meta.initialize.call(this, this.nextGeneration);
});



//plus some new genes
parthenogenesisMeta.addGenes({
	
	parentClasses : null,
	
	
	initialize : function(nextGeneration) {
		this.parentClasses 	= [];
	    this.attributes     = {},
	    this.methods        = {};
	    
	    this.nextGeneration = nextGeneration || this.defaultClassFunctionBody();
	},
	
	
	dieIfString : function (thing) {
	    if(Joose.S.isString(thing)) {
	        throw new TypeError("Parameter must not be a string.")
	    }
	},
	
	
	defaultClassFunctionBody : function () {
	    return function () {
	        this.initialize.apply(this, arguments);
	    };
	},
	
	
	addSuperClass : function (classObject) {
	    this.dieIfString(classObject);
	    
	    // Methods
	    for (var method in classObject.meta.methods) {
	    	this.addMethod(method, classObject.meta.methods[method]);
	    }

	    
	    for (var attr in classObject.meta.attributes) {
	    	this.addAttribute(attr, classObject.meta.attributes[attr]);
	    }
	    
	    this.parentClasses.unshift(classObject);
	}
	
	
//	
//	
//	addToString : function () {
//	    this.addMethod("toString", function () {
//	        if(this.stringify) {
//	            return this.stringify()
//	        }
//	        return "a "+ this.meta.className()
//	    })
//	}
	
	
});


Joose.Kernel.Parthenogenesis = parthenogenesisMeta.parturiate('Joose.Kernel.Parthenogenesis');





//parthenogenesisMeta.addAttribute('methodConstructor', Joose.Kernel.ProtoMethod);
//parthenogenesisMeta.addAttribute('attributeConstructor', Joose.Kernel.ProtoAttribute);



//	
//	
//	
//	
//
//    //overriding old
//    addMethod:         function (name, func) {
//        var m = new this.methodConstructor(name, func);
//        
//        this.addMethodObject(m)
//    },
//	
//
//    addMethodObject:         function (method) {
//        this.methods[name] = method;
//        
//        method.addToClass(this.nextGeneration)
//    },
//    
//    
////    attributeMetaclass: function () {
////        return this.attributeConstructor;
////    },
//    
//    
//    addAttribute:     function (name, init) {
//        var at = new this.attributeConstructor(name, { init : init });
//        
//        this.attributes[name] = at;
//        
//        at.apply(this.nextGeneration)
//    },
//    
//    
//    
//	
//	
//	getMethodNames : function() {
//		var res = [];
//		
//		for (var name in this.methods) {
//			res.push(name);
//		}
//		
//		return res;
//	},
//	
//	
//    getMethodObject: function (name) {
//        return this.methods[name]
//    },
//	
