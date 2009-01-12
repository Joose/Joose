//viviparityMeta is filled with introspection information from Parthenogenesis instanse
var viviparityMeta = new Joose.Kernel.Parthenogenesis('Joose.Kernel.Viviparity');


viviparityMeta.addAttribute('methodConstructor', Joose.Kernel.ProtoMethod);
viviparityMeta.addAttribute('attributeConstructor', Joose.Kernel.ProtoAttribute);


//plus some new genes
viviparityMeta.addGenes({
	
	addSuperClass : function (classObject) {
	    this.dieIfString(classObject);
	    if (!classObject.meta.hasMethod('getMethodNames') || !classObject.meta.hasMethod('getMethodObject')) throw "Class " + classObject + "can't be used as parent class";
        
	    var me = this;
	    
        // Methods
        var names = classObject.meta.getMethodNames();
        for(var i = 0; i < names.length; i++) {
            var name = names[i]
            
            var m = classObject.meta.getMethodObject(name)
            
            //compatibility with "ancient" metas, which holds methods as raw functions
            if(typeof m == 'function') {
            	m = new this.methodConstructor(name, m);
            }
            
            if(m) {
                var method = m.copy();
                method.setIsFromSuperClass(true);
                me.addMethodObject(method)
            }
        } 
        
        // Attributes
        Joose.O.eachSafe(classObject.meta.attributes, function (attribute, name) {
            var at = attribute;
            
            if (!(attribute && attribute.constructor == me.attributeConstructor)) {
            	at = new me.attributeConstructor(name, { init : at });
            }
            
            me.addAttributeObject(at);
        })
        
        this.parentClasses.unshift(classObject)
	},
	
	
    addMethod:         function (name, func) {
        var m = new this.methodConstructor(name, func);
        
        this.addMethodObject(m)
    },
	

    addMethodObject:         function (method) {
//        this.methods[method.getName()] = method;
        
        method.addToClass(this.nextGeneration)
    },
    
    
    attributeMetaclass: function () {
        return this.attributeConstructor;
    },
    
    
    //XXX refactor protoAttribute to accept init as 2nd param to constructor
    addAttribute:     function (name, init) {
        var at = new this.attributeConstructor(name, { init : init });
        
        this.addAttributeObject(at);
    },
    
    
    addAttributeObject : function (attribute) {
//    	var at = attribute;
    	
//        this.attributes[at.getName()] = attribute;
        
        attribute.apply(this.nextGeneration)
    },
    
    
    setAttribute: function (name, attributeObject) {
        return this.attributes[name] = attributeObject
    },
    
    
    wrapMethod:  function (name, wrappingStyle, func, notPresentCB) {
        
        var orig = this.getMethodObject(name);
        if(orig) {
            this.addMethodObject( orig[wrappingStyle](func) )
        } else {
            if(notPresentCB) {
                notPresentCB()
            } else {
                throw new Error("Unable to apply "+wrappingStyle+" method modifier because method "+name+" does not exist");
            }
        }
    }
    
});


//Joose.Kernel.Viviparity have no introspection capabilities, but it have inheritance mechanism instead of it
//Meta and Parent class are finally separated in Joose.Kernel.Viviparity
viviparityMeta.parentClasses.unshift(Joose.Kernel.Parthenogenesis);
Joose.Kernel.Viviparity = viviparityMeta.getClassObject();