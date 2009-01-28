//inheritanceMeta is filled with introspection information from Parthenogenesis instanse
var inheritanceMeta = new Joose.Kernel.ClassSeparation('Joose.Kernel.Inheritance');


inheritanceMeta.addAttribute('methodConstructor', Joose.Kernel.ProtoMethod);
inheritanceMeta.addAttribute('attributeConstructor', Joose.Kernel.ProtoAttribute);


//plus some new genes
inheritanceMeta.addGenes({
	
	addSuperClass : function (classObject) {
	    this.dieIfString(classObject);
	    if (!classObject.meta.meta.hasMethod('isa') || !classObject.meta.meta.hasMethod('getMethodObject')) throw "Class " + classObject + "can't be used as parent class";
        
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
                var method = m.copy(this.methodConstructor);
                method.setIsFromSuperClass(true);
                me.addMethodObject(method)
            }
        } 
        
        // Attributes
        Joose.O.eachSafe(classObject.meta.attributes, function (attribute, name) {
            var at = attribute;
            
//             && me.attributeConstructor.meta.isa(attribute.constructor)
            if (!(attribute && attribute.constructor && attribute.meta && attribute.constructor.meta == attribute.meta )){
            	at = new me.attributeConstructor(name, { init : name == 'attributes' ? null : at, lazy : true });
            } else {
            	at = at.copy(me.attributeConstructor);
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
    },
    
    
    makeAnonSubclass: function () {
        var anonSubClassMeta = new this.constructor(this.className()+"__anon__"+joose.anonymouseClassCounter++);
        anonSubClassMeta.addSuperClass(this.getClassObject());
        
        return anonSubClassMeta.getClassObject();
    }
    
    
});


//Joose.Kernel.Inheritance have no introspection capabilities, but it have inheritance mechanism instead of it
//Meta and Parent class are finally separated in Joose.Kernel.Inheritance
inheritanceMeta.parentClasses.unshift(Joose.Kernel.ClassSeparation);
Joose.Kernel.Inheritance = inheritanceMeta.getClassObject();