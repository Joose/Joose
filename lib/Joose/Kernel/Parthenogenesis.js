//Parthenogenesis is intermediate propagation model, like reptiles propagation via eggs, before mammals viviparity
//Parthenogenesis have a goal to separate meta and parent classes
//Parthenogenesis have genes of Fissiparity and also accept nextGeneration as 1st parameter for constructor
 
Joose.Kernel.Parthenogenesis = Joose.Kernel.Fissiparity.parturiate('Joose.Kernel.Parthenogenesis', function(nextGeneration) {
    //this is the actual separation - see below for overriden initialize method
    this.initialize.apply(this, arguments);
    
    //Parthenogenesis needs to introspect itself so it uses an ancient "initialize" method from previous propagation model in own scope
    //this is a "proto-analog" for calling parent's constructor
    this.meta.initialize.apply(this, arguments);
});


Joose.Kernel.Parthenogenesis.meta.addAttribute('methodConstructor', Joose.Kernel.ProtoMethod);
Joose.Kernel.Parthenogenesis.meta.addAttribute('attributeConstructor', Joose.Kernel.ProtoAttribute);


//plus some new genes
Joose.Kernel.Parthenogenesis.meta.addGenes({
	
	parentClasses : null,
	
	initialize : function(){
		this.parentClasses 	= [];
	    this.attributes     = {},
	    this.methods        = {};
	},
	
	
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
    
    
    attributeMetaclass: function () {
        return this.attributeConstructor;
    },
    
    
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

