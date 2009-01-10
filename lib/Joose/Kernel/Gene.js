Joose.Kernel = Joose.Kernel || {};


//Self-sufficient meta, built as minimal as possible, totally self-referenced
//behavior - during initialization introspect own prototype and add methods and attributes to itself. Also - apply this information to nextGeneration - further on evolution chain
//This class is a parent and a meta for itself
//
Joose.Kernel.Gene = function () {
    this.initialize.apply(this, arguments);
}


Joose.Kernel.Gene.prototype = {
	
	_name : 'Joose.Kernel.Gene',
	
	//note, that these attributes are actually stored in prototype, not in the instance, so they are shared among all instances without any initialization
	attributes 			: {},
	methods				: {},
	
	constructor : Joose.Kernel.Gene,
	meta : Joose.Kernel.Gene,
	
	nextGeneration : null,
	
	initialize : function (nextGeneration) {
		if (!nextGeneration) throw ("MetaClass cant be instantiated without nextGeneration");
		
		this.nextGeneration = nextGeneration;
		
	    var proto = this.constructor.prototype;
	    
	    for (var i in proto) {
	    	if (typeof proto[i] == 'function' && i != 'constructor' && i != 'meta') 
	    		this.addMethod(i, proto[i])
	    	else
	    		this.addAttribute(i, proto[i])
	    }
	},
	
	
    addMethod : function (name, func) {
    	if (typeof func != 'function') throw "Trying to add something else but not method";
    	
    	this.methods[name] = func;
    	this.nextGeneration.prototype[name] = func;
    },
    
    
    addAttribute : function (name, init) {
    	this.attributes[name] = init;
    	this.nextGeneration.prototype[name] = init;
    },
    
    
	hasMethod : function (name) { 
		return Boolean(this.methods[name]);
	},
	
	
	hasAttribute : function (name) { 
		return typeof this.attributes[name] != 'undefined';
	},
	

	className : function () { 
		return this._name;
	},
	
	
	getName : function () { 
		return this.className();
	},

	
	toString : function () {
	    if(this.meta) { 
        	return "a "+this.constructor.meta.className();
	    }
	    return "NoMeta"
	}
    
}



//micro bootstraping
Joose.Kernel.Gene = new Joose.Kernel.Gene(Joose.Kernel.Gene);

Joose.Kernel.Gene.meta 							= Joose.Kernel.Gene;
Joose.Kernel.Gene.constructor.meta				= Joose.Kernel.Gene;
Joose.Kernel.Gene.constructor.prototype.meta	= Joose.Kernel.Gene;

//turning back into class
Joose.Kernel.Gene = Joose.Kernel.Gene.constructor;



//adding new methods to Gene - note, that they will instantly appear, coz Gene is a parent for itself
Joose.Kernel.Gene.meta.addMethod('addGenes', function (genes) {
	for (var prop in genes) {
		if (typeof genes[prop] == 'function' && prop != 'meta' && prop != 'constructor') 
			this.addMethod(prop, genes[prop])
		else 
			this.addAttribute(prop, genes[prop])
	}
});


//this method will allow separate the class from its meta and parent classes
Joose.Kernel.Gene.meta.addGenes({
	
	adoptNextGeneration : function(){
	    var nextGeneration = this.nextGeneration;
	
	    nextGeneration.prototype.constructor = nextGeneration;
	    nextGeneration.prototype.meta = this;
	    nextGeneration.meta = this;
	    
	    if (!nextGeneration.hasOwnProperty('toString')) {
	    	nextGeneration.toString = function () { return this.meta.className() }
	    }
	    
	    return nextGeneration;
	},

	
    getClassObject: function () {
        return this.nextGeneration;
    }
	
});

