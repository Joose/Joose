Joose.Managed.Stem = new Joose.Proto.Meta('Joose.Managed.Stem', null, Joose.Managed.PropertySet.Composition, {
    
    targetClass             : null,
    
    methodsMC            : Joose.Managed.ClassStem.Methods,
    methodsModifiersMC   : Joose.Managed.ClassStem.MethodModifiers,
    attributesMC         : Joose.Managed.ClassStem.Attributes,
    

    initialize : function(name, props) {
        this.SUPER(name, props);
        
        
        this.targetClass = props.targetClass;
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetClass : this.targetClass
        });
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetClass : this.targetClass
        });
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetClass : this.targetClass
        });
        
        this.processOrder = [ 'attributes', 'methods', 'methodsModifiers'];
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {};
        props.init = func;
        props.type = type;
        
        return this.properties.methodsModifiers.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.properties.methodsModifiers.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {};
        props.init = func;
        
        return this.properties.methods.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        return this.properties.attributes.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        return this.properties.methods.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        return this.properties.attributes.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        return this.properties.methods.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        return this.properties.attributes.haveProperty(name);
    },
    

    getMethod : function(name) {
        return this.properties.methods.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        return this.properties.attributes.getProperty(name);
    }
    
}).c;
