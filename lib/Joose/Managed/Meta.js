Joose.Managed.Meta = new Joose.Kernel.ProtoMeta('Joose.Managed.Meta', null, Joose.Kernel.ProtoMeta, {
    
    methodsMetaClass         : Joose.Proto.Method.Set,
    
    attributesMetaClass      : Joose.Proto.Attribute.Set,
    
    builderMetaClass         : Joose.Proto.Builder,

    
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
        props = props || {};
        props.init = func;
        
        this.methods.meta.addProperty(name, props);
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        this.attributes.meta.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        this.methods.meta.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        this.attributes.meta.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        this.methods.meta.hasProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        this.attributes.meta.hasProperty(name);
    },
    

    hasOwnMethod: function (name) { 
        this.methods.meta.hasOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) {
        this.attributes.meta.hasOwnProperty(name);
    },
    

    getMethod : function(name) {
        this.methods.meta.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        this.attributes.meta.getProperty(name);
    },
    
    
    extend : function (props) {
        
    }    
    
    
}).c;