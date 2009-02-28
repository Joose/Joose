Joose.Managed.Meta = new Joose.Kernel.ProtoMeta('Joose.Managed.Meta', null, Joose.Kernel.ProtoMeta, {
    
    methodsMetaClass         : Joose.Kernel.MethodsSet,
    
    attributesMetaClass      : Joose.Kernel.AttributesSet,

    
    initialize: function (name, constructor, superClass, extend) {
        this.SUPER(arguments);
        
    },
    
    
    addSuperClass: function (classObject) {
        this.SUPER(arguments);
        
        this.attributes.meta = new this.attributesMetaClass({
            target              : this.c
        });
        
        this.methods.meta = new this.methodsMetaClass({
            target              : this.c
        });       
    },
    
    
    addMethod: function (name, func, props) {
        this.methods.meta.removeProperty(name);
    },
    
    
    addAttribute: function (name, init, props) {
    },
    
    
    removeMethod : function (name){
        this.methods.meta.removeProperty(name);
    },

    
    removeAttribute: function (name) {
    },
    
    
    hasMethod: function (name) { 
    },
    
    
    hasAttribute: function (name) { 
    },
    

    hasOwnMethod: function (name) { 
    },
    
    
    hasOwnAttribute: function (name) { 
    },
    
    
    extend : function (props) {
        Joose.O.eachSafe(props, function (value, name) {
            if (name != 'meta' && name != 'constructor') 
                if (typeof props[name] == 'function') this.addMethod(name, value); else this.addAttribute(name, value);
        }, this);
    }    
    
    
}).c;