Joose.Managed.Role = new Joose.Proto.Meta('Joose.Managed.Role', null, Joose.Proto.Meta, {
    
    stem                        : null,
    
    builder                     : null,
    
    defaultSuperClass           : null,
    
    
    initialize: function (name, extend) {
        this.name = name;
        extend = extend || {};
        
        this.prepareExtend(extend);
        this.finalizeExtend(extend);
        
        this.prepareCore();
        
        this.extend(extend);
        
        this.stem.close();
    },
    
    
    prepareExtend : function(extend){
        this.c = extend.hasOwnProperty('constructor') ? extend.constructor : this.defaultClassFunctionBody();
    },
    
    
    finalizeExtend : function(extend){
        this.adoptConstructor();
    },
    
    
    prepareCore : function(superClass){
        this.builder = new Joose.Managed.Builder({ targetClass : this.c });
        this.stem = new Joose.Managed.Stem();
    },
    
    
    defaultClassFunctionBody: function () {
        return function () {
            throw "Roles cant be instantiated"
        };
    },
    
    
    addSuperClass : function(){
    },
    

    extend : function (props) {
        if (props.builder) {
            this.builder.meta.extend(props.builder);
            delete props.builder;
        }
        
        if (props.stem) {
            this.stem.meta.extend(props.stem);
            delete props.stem;
        }
        
        this.builder.extend(props);
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {};
        props.init = func;
        props.type = type;
        
        return this.stem.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.stem.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {};
        props.init = func;
        
        return this.stem.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        return this.stem.properties.attributes.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        return this.stem.properties.methods.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        return this.stem.properties.attributes.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        return this.stem.properties.methods.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        return this.stem.properties.attributes.haveProperty(name);
    },
    
    
    hasOwnMethod: function (name) { 
        return this.hasMethod(name);
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.hasAttribute(name);
    },
    

    getMethod : function(name) {
        return this.stem.properties.methods.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        return this.stem.properties.attributes.getProperty(name);
    },
    
    
    addRole : function(){
        Joose.A.each(arguments, function(arg){
            var desc = arg;
            
            if (!(desc.meta instanceof Joose.Managed.Role)) {
                desc.propertySet = desc.role.meta.stem;
                delete desc.role;
            } else {
                desc = desc.meta.stem;
            }
            
            this.stem.addComposeInfo(desc);
        }, this)
    },
    
    
    removeRole : function(){
        Joose.A.each(arguments, function(arg){
            this.stem.removeComposeInfo(desc.role.meta.stem);
        }, this)
    }
    
}).c;