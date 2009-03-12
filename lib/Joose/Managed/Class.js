Joose.Managed.Class = new Joose.Proto.Class('Joose.Managed.Class', {
    
    isa                         : Joose.Proto.Class,
    
    stem                        : null,
    
    builder                     : null,
    
    
    initialize: function (name, extend) {
        this.SUPER(name, extend);
        
        this.stem.close();
    },
    
    
    processStem : function(extend){
        this.SUPER();
        
        var thisMeta = this.meta;
        
        var builderClass = thisMeta.builder ? thisMeta.builder.constructor : Joose.Managed.Builder;
        var stemClass = thisMeta.stem ? thisMeta.stem.constructor : Joose.Managed.Stem;
        
        if (this.superClass == this.constructor) {
            builderClass = thisMeta.subClassOf(builderClass);
            stemClass = thisMeta.subClassOf(stemClass);
        }
        
        this.builder = new builderClass({ targetClass : this.c });
        this.stem = new stemClass(this.name, { targetClass : this.c });
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
        
        this.builder._extend(props);
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {};
        props.init = func;
        props.meta = type;
        
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
        return this.stem.properties.methods.haveOwnProperty(name);
    },
    
    
    hasOwnAttribute: function (name) { 
        return this.stem.properties.attributes.haveOwnProperty(name);
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
            this.stem.removeComposeInfo(arg.meta.stem);
        }, this)
    }
    
}).c;