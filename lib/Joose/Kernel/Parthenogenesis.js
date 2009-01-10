//parthenogenesisMeta will separate meta and parent classes
var parthenogenesisMeta = new Joose.Kernel.Gene(function(name, nextGeneration) {
    //this is the actual separation - see below for overriden initialize method
    this.initialize.apply(this, arguments);
    
    //During instnatiation Parthenogenesis needs to introspect itself, so it uses an ancient "initialize" method from previous propagation model in own scope
    //this is a "proto-analog" for calling parent's constructor
    this.meta.initialize.call(this, this.nextGeneration);
});


//plus some new genes
parthenogenesisMeta.addGenes({
	
	parentClasses : null,
	
	
	initialize : function(name, nextGeneration) {
		this.parentClasses 	= [];
	    this.attributes     = {},
	    this.methods        = {};
	    this._name 			= name || "__anonymous__";
	    
	    this.nextGeneration = nextGeneration || this.defaultClassFunctionBody();
	    
	    this.adoptNextGeneration();
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
	
	
    
//    isa : function (classObject) {
//        this.dieIfString(classObject);
//        
//        // Same type
//        if(this.constructor == classObject) return true;
//        
//        // Look up into parent classes
////        for(var i = 0; i < this.parentClasses.length; i++) {
////            if(this.parentClasses[i].isa(classObject)) return true;
////        }
//        
//        return false;
//    },
    
    
    instantiate: function () {
        // Ough! Calling a constructor with arbitrary arguments hack
        var f = function () {};
        f.prototype = this.nextGeneration.prototype;
        var obj = new f();
        this.nextGeneration.apply(obj, arguments);
        return obj;
    },
    
    
    getMethodObject: function (name) {
        return this.methods[name]
    },
    
    
	getMethodNames : function() {
		var res = [];
		
		for (var name in this.methods) res.push(name);
		
		return res;
	},
	
	
    getSuperClasses:    function () {
        return this.parentClasses;
    },
    

    getSuperClass:    function () {
        return this.parentClasses[0];
    }
	
});

//external adoption - like reptiles eggs 
parthenogenesisMeta.adoptNextGeneration();
parthenogenesisMeta._name = 'Joose.Kernel.Parthenogenesis';

//Joose.Kernel.Parthenogenesis can be used as parent class (supports getMethodNames etc)
Joose.Kernel.Parthenogenesis = parthenogenesisMeta.getClassObject();
