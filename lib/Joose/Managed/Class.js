Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', null, Joose.Managed.Role, {
    
//    stem                        : null,
//    
//    builder                     : null,
//    
    defaultSuperClass           : Joose.Managed.Object,
    
    
//    initialize: function (name, extend) {
//        this.name = name;
//        extend = extend || {};
//        
//        this.prepareExtend(extend);
//        this.finalizeExtend(extend);
//        
//        this.prepareCore();
//        
//        this.extend(extend);
//        
//        this.stem.close();
//    },
    
    
    prepareExtend : function(extend){
        this.SUPER(extend);
        
        this.superClass = extend.isa || this.defaultSuperClass;
        delete extend.isa;
        
        this.addSuperClass();
    },
    
    
    finalizeExtend : function(extend){
//        this.adoptConstructor();
    },
    
    
    prepareCore : function(){
        var builderClass = this.superClass.meta.builder.constructor;
        
        if (this.meta instanceof Joose.Proto.Class) builderClass = new Joose.Proto.Class(null, null, builderClass).c;
        else builderClass = new this.meta.constructor(null, { isa : builderClass }).c;

        
        var stemClass = this.superClass.meta.stem.constructor;
        
        if (this.meta instanceof Joose.Proto.Class) stemClass = new Joose.Proto.Class(null, null, stemClass).c;
        else stemClass = new this.meta.constructor(null, { isa : stemClass }).c;

        this.builder = new builderClass({ targetClass : this.c });
        this.stem = new stemClass(this.name, { targetClass : this.c });
    },
    
    
    defaultClassFunctionBody: function () {
        return function () {
            this.initialize.apply(this, arguments);
        };
    },
    
    
    addSuperClass : function(){
        var superClass = this.superClass;
        
        this.c.prototype    = Joose.O.getMutableCopy(superClass.prototype);
        
        this.adoptConstructor();
        
        this.methods        = Joose.O.getMutableCopy(superClass.meta.methods);
        this.attributes     = Joose.O.getMutableCopy(superClass.meta.attributes);
    },
    

//    extend : function (props) {
//        if (props.builder) {
//            this.builder.meta.extend(props.builder);
//            delete props.builder;
//        }
//        
//        if (props.stem) {
//            this.stem.meta.extend(props.stem);
//            delete props.stem;
//        }
//        
//        this.builder.extend(props);
//    },
//    
//    
//    addMethodModifier: function (name, func, type) {
//        var props = {};
//        props.init = func;
//        props.type = type;
//        
//        return this.stem.properties.methodsModifiers.addProperty(name, props)
//    },
//    
//    
//    removeMethodModifier: function (name) {
//        return this.stem.properties.methodsModifiers.removeProperty(name)
//    },
//    
//    
//    addMethod: function (name, func, props) {
//        props = props || {};
//        props.init = func;
//        
//        return this.stem.properties.methods.addProperty(name, props)
//    },
//    
//    
//    addAttribute: function (name, init, props) {
//        props = props || {};
//        props.init = init;
//        
//        return this.stem.properties.attributes.addProperty(name, props);
//    },
//    
//    
//    removeMethod : function (name){
//        return this.stem.properties.methods.removeProperty(name);
//    },
//
//    
//    removeAttribute: function (name) {
//        return this.stem.properties.attributes.removeProperty(name);
//    },
//    
//    
//    hasMethod: function (name) {
//        return this.stem.properties.methods.haveProperty(name);
//    },
//    
//    
//    hasAttribute: function (name) { 
//        return this.stem.properties.attributes.haveProperty(name);
//    },
    
    
    hasOwnMethod: function (name) {
        return this.stem.properties.methods.haveOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name);
    }
    

//    getMethod : function(name) {
//        return this.stem.properties.methods.getProperty(name);
//    },
//    
//    
//    getAttribute : function(name) {
//        return this.stem.properties.attributes.getProperty(name);
//    },
//    
//    
//    addRole : function(){
//        Joose.A.each(arguments, function(arg){
//            var desc = arg;
//            
//            if (!(desc.meta instanceof Joose.Managed.Role)) {
//                desc.propertySet = desc.role.meta.stem;
//                delete desc.role;
//            } else {
//                desc = desc.meta.stem;
//            }
//            
//            this.stem.addComposeInfo(desc);
//        }, this)
//    },
//    
//    
//    removeRole : function(){
//        Joose.A.each(arguments, function(arg){
//            this.stem.removeComposeInfo(desc.role.meta.stem);
//        }, this)
//    }    
    
}).c;