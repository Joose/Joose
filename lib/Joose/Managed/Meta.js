Joose.Managed = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Meta = new Joose.Proto.Meta('Joose.Managed.Meta', null, Joose.Proto.Meta, {
    
    methodsMetaClass         : Joose.Proto.Method.Set,
    
    attributesMetaClass      : Joose.Proto.Attribute.Set,
    
    builder                  : null,

    
    initialize: function (name, constructor, superClass, extend) {
        extend = extend || {};
        if (extend.isa) {
            superClass = extend.isa;
            delete extend.isa;
        }
        
        this.SUPER(name, constructor, superClass, extend);
    },
    
    
    addSuperClass: function (classObject) {
        this.SUPER(arguments);
        
        this.attributes.meta = new this.attributesMetaClass({
            target              : this.c
        });
        
        this.methods.meta = new this.methodsMetaClass({
            target              : this.c
        });
        
        var builderClass = new this.constructor(null, null, classObject.meta.builder ? classObject.meta.builder.constructor : Joose.Proto.Builder).c;
        
        this.builder = new builderClass(this.c);
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
        this.methods.meta.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        this.attributes.meta.haveProperty(name);
    },
    

    hasOwnMethod: function (name) { 
        this.methods.meta.haveOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) {
        this.attributes.meta.haveOwnProperty(name);
    },
    

    getMethod : function(name) {
        this.methods.meta.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        this.attributes.meta.getProperty(name);
    },
    
    
    extend : function (props) {
        props = props || {};
        
        if (props.builder) {
            this.builder.meta.extend(props.builder);
            delete props.builder;
        }
        
        this.builder.extend(props);
    }    
    
    
}).c;