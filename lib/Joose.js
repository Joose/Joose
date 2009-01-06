var joosetop = this;

Joose = function () {
    this.cc              = null;  // the current class
    this.currentModule   = null
    this.top             = joosetop;
    this.globalObjects   = [];
    
    this.anonymouseClassCounter = 0;
};

// Static helpers for Arrays
Joose.A = {};
Joose.A.each = function (array, func) {
    for(var i = 0; i < array.length; i++) {
        func(array[i], i)
    }
}
Joose.A.exists = function (array, value) {
    for(var i = 0; i < array.length; i++) {
        if(array[i] == value) {
            return true
        }
    }
    return false
}
Joose.A.concat = function (source, array) {
    source.push.apply(source, array)
    return source
}

Joose.A.grep = function (array, func) {
    var a = [];
    Joose.A.each(array, function (t) {
        if(func(t)) {
            a.push(t)
        }
    })
    return a
}
Joose.A.remove = function (array, removeEle) {
    var a = [];
    Joose.A.each(array, function (t) {
        if(t !== removeEle) {
            a.push(t)
        }
    })
    return a
}

// Static helpers for Strings
Joose.S = {};
Joose.S.uppercaseFirst = function (string) { 
    var first = string.substr(0,1);
    var rest  = string.substr(1,string.length-1);
    first = first.toUpperCase()
    return first + rest;
}

Joose.S.isString = function (thing) { 
    if(typeof thing == "string") {
        return true
    }
    return false
}

// Static helpers for objects
Joose.O = {};
Joose.O.each = function (object, func) {
    for(var i in object) {
        func(object[i], i)
    }
}

Joose.O.eachSafe = function (object, func) {
    for(var i in object) {
        if(object.hasOwnProperty(i)) {
            func(object[i], i)
        }
    }
}

// Experimental!
Joose.O.extend = function (target, newObject) {
    for(var i in newObject) {
        var thing = newObject[i]
        target[i] = thing
    }
}


Joose.prototype = {
    
    addToString: function (object, func) {
        object.toString = func;
    },
    
    /*
     * Differentiates between instances and classes
     */
    isInstance: function(obj) {
        if(!obj.meta) {
            throw "isInstance only works with Joose objects and classes."
        }
        if(obj.constructor === obj.meta.c) {
            return true
        }
        return false
    },
    
    init: function () {
        this.builder = new Joose.Builder();
        this.builder.globalize()
    },
    // this needs to be updated in release.pl too, if files are added
    components: function () {
        return [
        	"Joose.MetaClassBootstrap",
            "Joose.Builder",
            "Joose.Class",
            "Joose.Method",
            "Joose.ClassMethod",
            "Joose.Attribute",
            "Joose.Role",
            "Joose.SimpleRequest",
            "Joose.Gears",
            "Joose.Storage",
            "Joose.Storage.Unpacker",
            "Joose.Decorator",
            "Joose.Module",
            "Joose.Prototype",
            "Joose.TypeConstraint",
            "Joose.TypeCoercion",
            "Joose.Types"
        ]
    },

    loadComponents: function (basePath) {
        var html = "";
        Joose.A.each(this.components(), function (name) {
            var url    = ""+basePath + "/" + name.split(".").join("/") + ".js";
           
            html += '<script type="text/javascript" src="'+url+'"></script>'
        })
        document.write(html)
    }
}

Joose.copyObject = function (source, target) {
    var keys = "";
    Joose.O.each(source, function (value, name) {  keys+=", "+name; target[name] = value })
    return target
};



Joose.emptyFunction = function () {};

var joose = new Joose();


Joose.bootstrap = function () {
    // Bootstrap
    var BOOT = new Joose.MetaClassBootstrap(); 
    
    BOOT.builder    = Joose.MetaClassBootstrap;

    Joose.MetaClass = BOOT.createClass("Joose.MetaClass");
   
    Joose.MetaClass.meta.addNonJooseSuperClass("Joose.MetaClassBootstrap", BOOT)
    
    Joose.MetaClass.meta.addMethod("initialize", function () { this._name = "Joose.MetaClass" })

    var META     = new Joose.MetaClass();
    
    META.builder = Joose.MetaClass;
    
    Joose.Class  = META.createClass("Joose.Class")
    Joose.Class.meta.addSuperClass(Joose.MetaClass);
    Joose.Class.meta.addMethod("initialize", function () { this._name = "Joose.Class" })
}

Joose.bootstrap2 = function () {
    // Turn Joose.Method into a Joose.Class object
    Joose.Builder.Globals.joosify("Joose.Method", Joose.Method)
    Joose.Builder.Globals.joosify("Joose.Attribute", Joose.Attribute)
}

Joose.bootstrap3 = function () {
    // make the .meta object circular
}



//========================================================================================================================================================================================================================================================
//========================================================================================================================================================================================================================================================
Joose.Kernel = Joose.Kernel || {};

//perfect absorber of genetic information
Joose.Kernel.GENE = function () {
    this.initialize.apply(this, arguments);
}


Joose.Kernel.GENE.prototype = {
	
	_name 				: 'Joose.Kernel.GENE',
	attributes 			: {},
	methods				: {},
	
	constructor : Joose.Kernel.GENE,
	meta : Joose.Kernel.GENE,
	
	
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


//Blastogenesis - meta, parent and the class itself are the same things
Joose.Kernel.GENE = new Joose.Kernel.GENE(Joose.Kernel.GENE);
Joose.Kernel.GENE.constructor.prototype.meta = Joose.Kernel.GENE;
Joose.Kernel.GENE.constructor.meta = Joose.Kernel.GENE;

Joose.Kernel.GENE.meta.addMethod('className', function () { return this._name } );
Joose.Kernel.GENE.meta.addMethod('getName', function () { return this.className() } );
Joose.Kernel.GENE.meta.addMethod('hasMethod', function (name) { return Boolean(this.methods[name]) } );
Joose.Kernel.GENE.meta.addMethod('hasAttribute', function (name) { return Boolean(this.attributes[name]) } );

Joose.Kernel.GENE.meta.addMethod('defaultClassFunctionBody', function () {
    var f = function () {
        this.initialize.apply(this, arguments);
    };
//    joose.addToString(f, function () {
//        return this.meta.className()
//    })
    return f;
});



//viviparity, meta and parent class are still the same thing, but the class have been separated
//createClass:    function (name, optionalConstructor, optionalModuleObject) {
Joose.Kernel.GENE.meta.addMethod('parturiate', function (name, baby, optionalModuleObject) { 
    
    baby = baby || this.defaultClassFunctionBody();
        
    //XXX namespace-module
//    if(optionalModuleObject) {
//        optionalModuleObject.addElement(baby)
//    }
    
    baby.prototype.constructor = baby;
    
    //baby also receives all genes (attrs and methods) of "mother" (mother is this, and mother's genes are this.constructor)
    baby.prototype.meta = new this.constructor(baby);
    baby.meta = baby.prototype.meta;
    
    
    //XXX namespace-module
//    if(name == null) {
//        baby.meta._name = "__anonymous__" 
//    } else {
//        var className = name;
//        if(optionalModuleObject) {
//            className = optionalModuleObject.getName() + "." + name
//        }
//        baby.meta._name = className;
//    }
    
    //XXX namespace-module
    // store them in the global object if they have no namespace
    // They will end up in the Module __JOOSE_GLOBAL__
//    if(!optionalModuleObject) {
//        // Because the class Joose.Module might not exist yet, we use this temp store
//        // that will later be in the global module
//        joose.globalObjects.push(c)
//    }
    
//    meta.addInitializer();
//    meta.addToString();
//    meta.addDetacher();
    
    return baby;
});


//Specimen have a goal to separate meta and parent classes, so Gene produces such class..
//Specimen have genes of GENE
//Specimen will be intermediate class in evolution, like reptiles before mammals 
Joose.Kernel.Specimen = Joose.Kernel.GENE.parturiate(function() {
    //Specimen needs to introspect itself but instead nextGeneration manipulation in BlastoGenesis way it will use Viviparity 
    this.meta.initialize.apply(this, arguments);
    
    this.initialize.apply(this, arguments);
});

//plus some new genes
Joose.Kernel.Specimen.meta.addAttribute('parentClasses', null);
Joose.Kernel.Specimen.meta.addMethod('initialize', function(){
	this.parentClasses 	= [];
    this.attributes     = {},
    this.methods        = {};
});





//finally, meta and parent class are separated