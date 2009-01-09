var parthenogenesisMeta = new Joose.Kernel.Gene(function(nextGeneration) {
    //this is the actual separation - see below for overriden initialize method
    this.initialize.apply(this, arguments);
    
    //During instnatiation Parthenogenesis needs to introspect itself, so it uses an ancient "initialize" method from previous propagation model in own scope
    //this is a "proto-analog" for calling parent's constructor
    this.meta.initialize.apply(this, arguments);
});


Joose.Kernel.Parthenogenesis.meta.addAttribute('methodConstructor', Joose.Kernel.ProtoMethod);
Joose.Kernel.Parthenogenesis.meta.addAttribute('attributeConstructor', Joose.Kernel.ProtoAttribute);


//plus some new genes
Joose.Kernel.Parthenogenesis.meta.addGenes({
	
	
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
	
	
	
	parentClasses : null,
	
	initialize : function(){
		this.parentClasses 	= [];
	    this.attributes     = {},
	    this.methods        = {};
	},
	
	
    //overriding old
    addMethod:         function (name, func) {
        var m = new this.methodConstructor(name, func);
        
        this.addMethodObject(m)
    },
	

    addMethodObject:         function (method) {
//        var m              = method;
//        var name           = m.getName();
        
//        if(!this.methods[name] && !this.classMethods[name]) {
//            this.methodNames.push(name);
//        }
//        if(m.isClassMethod()) {
//            this.classMethods[name] = m;
//        } else {
            this.methods[name] = method;
//        }
        
        method.addToClass(this.nextGeneration)
    },
    
    
//    attributeMetaclass: function () {
//        return this.attributeConstructor;
//    },
    
    
    addAttribute:     function (name, init) {
//        var metaclass = this.attributeMetaclass();
//        
//        if(props && props.metaclass) {
//            metaclass = props.metaclass
//        }
        
        var at = new this.attributeConstructor(name, { init : init });
        
        this.attributes[name] = at;
        
        at.apply(this.nextGeneration)
    },
    
    
    
	dieIfString : function (thing) {
	    if(Joose.S.isString(thing)) {
	        throw new TypeError("Parameter must not be a string.")
	    }
	},
	
	
	getMethodNames : function() {
		var res = [];
		
		for (var name in this.methods) {
			res.push(name);
		}
		
		return res;
	},
	
	
    getMethodObject: function (name) {
        return this.methods[name]
    },
	


	addSuperClass : function (classObject) {
	    this.dieIfString(classObject);
	    var me    = this;
	    
	    // Methods
	    var names = classObject.meta.getMethodNames();
	    for(var i = 0; i < names.length; i++) {
	        var name = names[i]
	        
	        var m = classObject.meta.getMethodObject(name)
	        if(m) {
	            var method = m.copy();
	            method.setIsFromSuperClass(true);
	            me.addMethodObject(method)
	        }
//        m = classObject.meta.getClassMethodObject(name)
//        if(m) {
//            var method = m.copy();
//            method.setIsFromSuperClass(true);
//            me.addMethodObject(method)
//        }
	    } 
	    
	    // Attributes
	    Joose.O.eachSafe(classObject.meta.attributes, function (attr, name) {
	        me.addAttribute(name, attr.getProps())
	    })
	    
//    // Roles
//    var roles = classObject.meta.roles
//    for(var i = 0; i < roles.length; i++) {
//        var role = roles[i]
//        me.roles.push(role)
//    }
	    
	    this.parentClasses.unshift(classObject)
	}
});

//Joose.Kernel.Parthenogenesis = .parturiate('Joose.Kernel.Parthenogenesis');