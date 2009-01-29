//classSeparationMeta will separate meta and parent classes
var classSeparationMeta = new Joose.Kernel.ProtoMeta(function(name, nextGeneration) {
    //this is the actual separation - see below for overriden initialize method
    this.initialize.apply(this, arguments);
    
    //During instantiation Joose.Kernel.ClassSeparation needs to introspect itself, so it uses an "initialize" method from previous bootstraping stage in own scope
    //this is a "proto-analog" of parent's constructor calling
    this.meta.initialize.call(this, this.nextGeneration);
});


//plus some new genes
classSeparationMeta.addGenes({
	
	parentClasses : null,
	
	
	initialize : function(name, nextGeneration) {
		this.parentClasses 	= [];
	    this.attributes     = {},
	    this.methods        = {};
	    this._name 			= name || "__anonymous__";
	    
	    this.nextGeneration = nextGeneration || this.defaultClassFunctionBody();
	    
	    this.adoptNextGeneration();
	},
	
	
    /**
     * Returns the default constructor function for new classes. You might want to override this in derived meta classes
     * Default calls initialize on a new object upon construction.
     * The class object will stringify to it's name
     * @function
     * @name defaultClassFunctionBody
     * @memberof Joose.Class
     */
    /** @ignore */
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
        
        return this.classIsa(classObject);
    },
    
    
    /**
     * Returns a new instance of the class that this meta class instance is representing
     * @function
     * @name instantiate
     * @memberof Joose.Class
     */    
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
        //native toString filtering
    	return this.attributes.hasOwnProperty(name) ? this.attributes[name] : undefined;
    },
    
    
    getMethodObject: function (name) {
        //native toString filtering
        return this.methods.hasOwnProperty(name) ? this.methods[name] : undefined;
    },
    
    
	getMethodNames : function() {
		var res = [];
		
		for (var name in this.methods) if (this.methods.hasOwnProperty(name)) res.push(name);
		
		return res;
	},
	
	
    getAttributeNames: function () {
		var res = [];
		
		for (var name in this.attributes) if (this.attributes.hasOwnProperty(name)) res.push(name);
		
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

//further classes have call to adoptNextGeneration in initialize, but classSeparationMeta isa Joose.Kernel.ProtoMeta
//and it needs to do it manually
classSeparationMeta.adoptNextGeneration();
//the same about _name
classSeparationMeta._name = 'Joose.Kernel.ClassSeparation';

//Joose.Kernel.ClassSeparation can be used as parent class (supports getMethodNames etc)
Joose.Kernel.ClassSeparation = classSeparationMeta.getClassObject();
