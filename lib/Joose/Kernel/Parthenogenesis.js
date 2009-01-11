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
	
	
	defaultClassFunctionBody : function () {
	    return function () {
	        this.initialize.apply(this, arguments);
	    };
	},
	
	
	classIsa : function (classObject) {
		this.dieIfString(classObject);
		
		if (this.nextGeneration == classObject) return true;
		
		for (var i = 0; i < this.parentClasses.length; i++) {
			if (this.parentClasses[i].meta.classIsa(classObject)) return true;
		}
		
		return false;
	}, 
	
    
    isa : function (classObject) {
        this.dieIfString(classObject);
        
        return this.meta.classIsa(classObject);
    },
    
    
    instantiate: function () {
        // Ough! Calling a constructor with arbitrary arguments hack
        var f = function () {};
        f.prototype = this.nextGeneration.prototype;
        var obj = new f();
        this.nextGeneration.apply(obj, arguments);
        return obj;
    },
    
    
    getAttributes: function () {
        return this.attributes
    },
    
    
    getAttribute: function (name) {
        return this.attributes[name]
    },
    
    
    getMethodObject: function (name) {
        return this.methods[name]
    },
    
    
    dispatch:        function (name) {
        return this.getMethodObject(name).asFunction()
    },
    
    
	getMethodNames : function() {
		var res = [];
		
		for (var name in this.methods) res.push(name);
		
		return res;
	},
	
	
    getAttributeNames: function () {
		var res = [];
		
		for (var name in this.attributes) res.push(name);
		
		return res;
    },
	
	
	
    getSuperClasses:    function () {
        return this.parentClasses;
    },
    

    getSuperClass:    function () {
        return this.parentClasses[0];
    },
    
    
    classNameToClassObject: function (className) {
        var top    = joose.top;
        var parts  = className.split(".");
        var object = top;
        for(var i = 0; i < parts.length; i++) {
            var part = parts[i];
            object   = object[part];
            if(!object) {
                throw "Unable to find class "+className
            }
        }
        return object
    }
	
});

//external adoption - like reptiles eggs 
parthenogenesisMeta.adoptNextGeneration();
parthenogenesisMeta._name = 'Joose.Kernel.Parthenogenesis';

//Joose.Kernel.Parthenogenesis can be used as parent class (supports getMethodNames etc)
Joose.Kernel.Parthenogenesis = parthenogenesisMeta.getClassObject();
