Joose.Managed.Meta = new Joose.Proto.Meta('Joose.Managed.Meta', null, Joose.Proto.Meta, {
    
    methodsMetaClass         : Joose.Managed.Method.Set,
    
    attributesMetaClass      : Joose.Managed.Attribute.Set,
    
    builder                  : null,
    
    composed                 : false,

    
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
        
        this.attributes.meta = new this.attributesMetaClass({
            target              : this.c
        });
        
        this.methods.meta = new this.methodsMetaClass({
            target              : this.c
        });
        
        
        var builderClass = classObject.meta.builder ? new this.meta.constructor(null, null, classObject.meta.builder.constructor).c : Joose.Managed.Builder;
        
        this.builder = new builderClass({
            target              : this.c
        });
    },
    
    
    addMethod: function (name, func, props) {
        if (this.composed) throw "Can't modify composed class";
        
        props = props || {};
        props.init = func;
        
        func.Class = this.c;
        func.methodName = name;
        
        return this.methods.meta.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        if (this.composed) throw "Can't modify composed class";
        
        props = props || {};
        props.init = init;
        
        return this.attributes.meta.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        if (this.composed) throw "Can't modify composed class";
        
        return this.methods.meta.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        if (this.composed) throw "Can't modify composed class";
        
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
        if (this.composed) return;
        
        this.attributes.meta.compose();
        this.methods.meta.compose();
        
        this.composed = true;
    },
    
    
    deCompose : function(){
        if (!this.composed) return;
        
        this.attributes.meta.deCompose();
        this.methods.meta.deCompose();
        
        this.composed = false;
    }
    
}).c;