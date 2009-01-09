//Viviparity will finally separate meta and parent classes
//Viviparity do not accept nextGeneration parameter - it will produce it with defaultClassFunctionBody
Joose.Kernel.Viviparity = new Joose.Kernel.Parthenogenesis();

Joose.Kernel.Viviparity.meta._name = 'Joose.Kernel.Viviparity';


//plus some new genes
Joose.Kernel.Viviparity.meta.addGenes({
//	
//	parentClasses : null,
//	
//	initialize : function(){
//		this.parentClasses 	= [];
//	    this.attributes     = {},
//	    this.methods        = {};
//	},
//	
//	
//    addMethod:         function (name, func) {
//        var m = new this.methodConstructor(name, func);
//        
//        this.addMethodObject(m)
//    },
//	
//
//    addMethodObject:         function (method) {
////        var m              = method;
////        var name           = m.getName();
//        
////        if(!this.methods[name] && !this.classMethods[name]) {
////            this.methodNames.push(name);
////        }
////        if(m.isClassMethod()) {
////            this.classMethods[name] = m;
////        } else {
//            this.methods[name] = method;
////        }
//        
//        method.addToClass(this.nextGeneration)
//    },
//    
//    
//    attributeMetaclass: function () {
//        return this.attributeConstructor;
//    },
    
  

    addAttribute:     function (name, props) {
        var metaclass = this.attributeConstructor;
        
        if(props && props.metaclass) {
            metaclass = props.metaclass
        }
        
        var at = new this.attributeConstructor(name, props);
        
        this.attributes[name] = at;
        
        at.apply(this.nextGeneration)
    },
    
    
    
//	dieIfString : function (thing) {
//	    if(Joose.S.isString(thing)) {
//	        throw new TypeError("Parameter must not be a string.")
//	    }
//	},
//
//
//	addSuperClass : function (classObject) {
//	    this.dieIfString(classObject);
//	    var me    = this;
//	    
//	    // Methods
//	    var names = classObject.meta.getMethodNames();
//	    for(var i = 0; i < names.length; i++) {
//	        var name = names[i]
//	        
//	        var m = classObject.meta.getMethodObject(name)
//	        if(m) {
//	            var method = m.copy();
//	            method.setIsFromSuperClass(true);
//	            me.addMethodObject(method)
//	        }
////        m = classObject.meta.getClassMethodObject(name)
////        if(m) {
////            var method = m.copy();
////            method.setIsFromSuperClass(true);
////            me.addMethodObject(method)
////        }
//	    } 
//	    
//	    // Attributes
//	    Joose.O.eachSafe(classObject.meta.attributes, function (attr, name) {
//	        me.addAttribute(name, attr.getProps())
//	    })
//	    
////    // Roles
////    var roles = classObject.meta.roles
////    for(var i = 0; i < roles.length; i++) {
////        var role = roles[i]
////        me.roles.push(role)
////    }
//	    
//	    this.parentClasses.unshift(classObject)
//	}
});

