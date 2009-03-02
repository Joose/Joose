Joose.Managed.Meta = new Joose.Proto.Meta('Joose.Managed.Meta', null, Joose.Proto.Meta, {
    
    methodsMetaClass            : Joose.Managed.Method.Set,
    
    methodsModifiersMetaClass   : Joose.Managed.Method.Modifier.Set,
    
    attributesMetaClass         : Joose.Managed.Attribute.Set,
    
    builder                     : null,
    
    
    initialize: function (name, constructor, superClass, extend) {
        extend = extend || {};
        if (extend.isa) {
            superClass = extend.isa;
            delete extend.isa;
        }
        
        this.SUPER(name, constructor, superClass, extend);
        
        this.compose();
    },
    
    
    addSuperClass: function (classObject) {
        this.SUPER(classObject);
        
        this.attributes.meta            = new this.attributesMetaClass(     { targetClass     : this.c });
        this.methods.meta               = new this.methodsMetaClass(        { targetClass     : this.c });
        
        this.methodsModifiers           = {};
        this.methodsModifiers.meta      = new this.methodsMetaClass(        { targetClass     : this.c });

        
        var builderClass = classObject.meta.builder ? new this.meta.constructor(null, null, classObject.meta.builder.constructor).c : Joose.Managed.Builder;
        
        this.builder = new builderClass({
            targetClass              : this.c
        });
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {};
        props.init = func;
        props.type = type;
        
        return this.methodsModifiers.meta.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.methodsModifiers.meta.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {};
        props.init = func;
        
        func.SUPER = this.superClass.prototype;
        func.methodName = name;
        
        return this.methods.meta.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        return this.attributes.meta.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        return this.methods.meta.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        this.attributes.meta.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        return this.methods.meta.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        return this.attributes.meta.haveProperty(name);
    },
    

    hasOwnMethod: function (name) { 
        return this.methods.meta.haveOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) {
        return this.attributes.meta.haveOwnProperty(name);
    },
    

    getMethod : function(name) {
        return this.methods.meta.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        return this.attributes.meta.getProperty(name);
    },
    
    
    extend : function (props) {
        props = props || {};
        
        if (props.builder) {
            this.builder.meta.extend(props.builder);
            delete props.builder;
        }
        
        this.builder.extend(props);
    },
    
    
    compose : function(){
        this.attributes.meta.compose();
        this.methods.meta.compose();
        this.methodsModifiers.meta.compose();
    },
    
    
    deCompose : function(){
        this.methodsModifiers.meta.deCompose();
        this.methods.meta.deCompose();
        this.attributes.meta.deCompose();
    }
    
}).c;