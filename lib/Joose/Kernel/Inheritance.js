//inheritanceMeta is filled with introspection information, coz it is Joose.Kernel.ClassSeparation instance
var inheritanceMeta = new Joose.Kernel.ClassSeparation('Joose.Kernel.Inheritance');


inheritanceMeta.addAttribute('methodMetaClass', Joose.Kernel.ProtoMethod);
inheritanceMeta.addAttribute('attributeMetaClass', Joose.Kernel.ProtoAttribute);


//plus some new genes
inheritanceMeta.extend({
    
    addSuperClass: function (classObject) {
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
                m = new this.methodMetaClass(name, m);
            }
            
            if(m) {
                var method = m.copy(this.methodMetaClass);
                method.setIsFromSuperClass(true);
                me.addMethodObject(method)
            }
        } 
        
        // Attributes
        Joose.O.eachSafe(classObject.meta.attributes, function (attribute, name) {
            var at = attribute;
            
//            if (!(attribute && joose.isInstance(attribute) )){ //without exception
            if (!(attribute && attribute.meta && attribute.constructor == attribute.meta.c )){
                //lazy to avoid call during initialization
                //if inheriting attribute "attributes" - initialize it with null, to avoid recursive data structure
                at = new me.attributeMetaClass(name, { init: name == 'attributes' ? null: at, lazy: true });
            } else {
                at = at.copy(me.attributeMetaClass);
            }
            
            me.addAttributeObject(at);
        })
        
        this.parentClasses.unshift(classObject)
    },
    
    
    addMethod:         function (name, func) {
        var m = new this.methodMetaClass(name, func);
        
        this.addMethodObject(m)
    },
    

    addMethodObject:         function (method) {
//        this.methods[method.getName()] = method;
        
        method.addToClass(this.c)
    },
    
    
    attributeMetaclass: function () {
        return this.attributeMetaClass;
    },
    
    
    //XXX? refactor protoAttribute to accept init as 2nd param to constructor
    addAttribute:     function (name, init) {
        var at = new this.attributeMetaClass(name, { init: init });
        
        this.addAttributeObject(at);
    },
    
    
    addAttributeObject: function (attribute) {
//        var at = attribute;
        
//        this.attributes[at.getName()] = attribute;
        
        attribute.addToClass(this.c)
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
    },
    
    
    dispatch:        function (name) {
        return this.getMethodObject(name).asFunction()
    }
    
    
});


//Joose.Kernel.Inheritance have no introspection capabilities, but it have inheritance mechanism instead of it
//Meta and Parent class are finally separated in Joose.Kernel.Inheritance
inheritanceMeta.parentClasses.unshift(Joose.Kernel.ClassSeparation);
Joose.Kernel.Inheritance = inheritanceMeta.getClassObject();