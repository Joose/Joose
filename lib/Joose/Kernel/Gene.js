Joose.Kernel = Joose.Kernel || {};


//perfect absorber of genetic information
Joose.Kernel.Gene = function () {
    this.initialize.apply(this, arguments);
}


Joose.Kernel.Gene.prototype = {
	
	//note, that these attributes are actually stored in prototype, not in the instance..
	attributes 			: {},
	methods				: {},
	
	constructor : Joose.Kernel.Gene,
	meta : Joose.Kernel.Gene,
	
	nextGeneration : null,
	
	initialize : function (nextGeneration) {
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
    	//do not override?
    	if (this.nextGeneration /*&& typeof this.nextGeneration.prototype[name] == 'undefined'*/) this.nextGeneration.prototype[name] = func;
    },
    
    
    addAttribute : function (name, init) {
    	this.attributes[name] = init;
    	//do not override?
    	if (this.nextGeneration /*&& typeof this.nextGeneration.prototype[name] == 'undefined'*/) this.nextGeneration.prototype[name] = init;
    }
    
}

Joose.Kernel.Gene.attributes = Joose.Kernel.Gene.prototype.attributes;
Joose.Kernel.Gene.methods = Joose.Kernel.Gene.prototype.methods;
Joose.Kernel.Gene.constructor = Joose.Kernel.Gene;
Joose.Kernel.Gene.meta = Joose.Kernel.Gene;
Joose.Kernel.Gene.nextGeneration = Joose.Kernel.Gene.prototype;
Joose.Kernel.Gene.initialize = Joose.Kernel.Gene.prototype.initialize;
Joose.Kernel.Gene.addMethod = Joose.Kernel.Gene.prototype.addMethod;
Joose.Kernel.Gene.addAttribute = Joose.Kernel.Gene.prototype.addAttribute;


//note - gene's meta is a function, not an usual instance, so its not inherit from own's prototype and gene is kinda pseudo meta for itself ) 