//fissiparity - meta, parent and the class itself are the same things, manipulations via any of them are equal
//the only assymetry is that Joose.Kernel.Fissiparity.meta != Joose.Kernel.Fissiparity.constructor.meta  
Joose.Kernel.Fissiparity = new Joose.Kernel.Gene(Joose.Kernel.Gene);
Joose.Kernel.Fissiparity.meta = Joose.Kernel.Fissiparity;

Joose.Kernel.Fissiparity.meta.addMethod('addGenes', function (genes) {
	for (var prop in genes) {
		if (typeof genes[prop] == 'function' && prop != 'meta' && prop != 'constructor') this.addMethod(prop, genes[prop])
		else this.addAttribute(prop, genes[prop])
	}
});


//note - meta & class are the same - method is instantly available after adding
Joose.Kernel.Fissiparity.meta.addGenes({
	
	
	_name : 'Joose.Kernel.Fissiparity',
	
	
	className : function () { 
		return this._name;
	},
	
	
	getName : function () { 
		return this.className();
	},
	
	
	toString : function () {
	    if(this.meta) {
	        return "a "+this.meta.className();
	    }
	    return "NoMeta"
	},
	
	
	hasMethod : function (name) { 
		return Boolean(this.methods[name]);
	},
	
	
	hasAttribute : function (name) { 
		return Boolean(this.attributes[name]);
	},
	
	
	defaultClassFunctionBody : function () {
	    var f = function () {
	        this.initialize.apply(this, arguments);
	    };
	    joose.addToString(f, function () {
	        return this.meta.className()
	    })
	    return f;
	},
	

	addToString : function () {
	    this.addMethod("toString", function () {
	        if(this.stringify) {
	            return this.stringify()
	        }
	        return "a "+ this.meta.className()
	    })
	},


//Joose.Kernel.Fissiparity learned how to parturiate a separate species - but its parent and meta classes still will be the same thing
//
//createClass:    function (name, optionalConstructor, optionalModuleObject) {
	parturiate : function (name, nextGeneration, optionalModuleObject) { 
    
	    nextGeneration = nextGeneration || this.defaultClassFunctionBody();
	    joose.addToString(nextGeneration, function () {
	        return this.meta.className()
	    });
	    
	        
	    //XXX namespace-module
	//    if(optionalModuleObject) {
	//        optionalModuleObject.addElement(nextGeneration)
	//    }
	    
	    nextGeneration.prototype.constructor = nextGeneration;
	    
	    //nextGeneration receives all genes (attrs and methods) of "mother" (mother is "this", and mother's genes are "this.constructor") via Gene's "initialize" method
	    //here this.constructor == Joose.Kernel.Gene
	    nextGeneration.prototype.meta = new this.constructor(nextGeneration);
	    nextGeneration.meta = nextGeneration.prototype.meta;
	    
	    
//	    XXX namespace-module
	    if(name == null) {
	        nextGeneration.meta._name = "__anonymous__" 
	    } else {
	        var className = name;
	        if(optionalModuleObject) {
	            className = optionalModuleObject.getName() + "." + name
	        }
	        nextGeneration.meta._name = className;
	    }
	    
	    //XXX namespace-module
	    // store them in the global object if they have no namespace
	    // They will end up in the Module __JOOSE_GLOBAL__
	//    if(!optionalModuleObject) {
	//        // Because the class Joose.Module might not exist yet, we use this temp store
	//        // that will later be in the global module
	//        joose.globalObjects.push(c)
	//    }
	    
	//    meta.addInitializer();
		nextGeneration.meta.addToString();
	//    meta.addDetacher();
	    
	    return nextGeneration;
	}
});

