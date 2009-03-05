Joose.Managed.Stem = new Joose.Proto.Meta('Joose.Managed.Stem', null, Joose.Managed.PropertySet.Composition, {
    
    targetClass             : null,
    
    methodsSetMC            : Joose.Managed.StemElements.Methods,
    methodsModifiersSetMC   : Joose.Managed.StemElements.MethodModifiers,
    attributesSetMC         : Joose.Managed.StemElements.Attributes,
    

    initialize : function(name, props) {
        this.SUPER(props);
        
        this.targetClass = props.targetClass;
        
        this.addProperty('methodsSet', {
            meta : this.methodsSetMC,
            targetClass : this.targetClass
        });
        
        this.addProperty('methodsModifiersSet', {
            meta : this.methodsModifiersSetMC,
            targetClass : this.targetClass
        });
        
        this.addProperty('attributesSet', {
            meta : this.attributesSetMC,
            targetClass : this.targetClass
        });
    },
    
    
    addMethodModifier: function (name, func, type) {
        var props = {};
        props.init = func;
        props.type = type;
        
        return this.properties.methodsModifiersSet.addProperty(name, props)
    },
    
    
    removeMethodModifier: function (name) {
        return this.properties.methodsModifiersSet.removeProperty(name)
    },
    
    
    addMethod: function (name, func, props) {
        props = props || {};
        props.init = func;
        
        return this.properties.methodsSet.addProperty(name, props)
    },
    
    
    addAttribute: function (name, init, props) {
        props = props || {};
        props.init = init;
        
        return this.properties.attributesSet.addProperty(name, props);
    },
    
    
    removeMethod : function (name){
        return this.properties.methodsSet.removeProperty(name);
    },

    
    removeAttribute: function (name) {
        return this.properties.attributesSet.removeProperty(name);
    },
    
    
    hasMethod: function (name) {
        return this.properties.methodsSet.haveProperty(name);
    },
    
    
    hasAttribute: function (name) { 
        return this.properties.attributesSet.haveProperty(name);
    },
    

    getMethod : function(name) {
        return this.properties.methodsSet.getProperty(name);
    },
    
    
    getAttribute : function(name) {
        return this.properties.attributesSet.getProperty(name);
    }
    
}).c;
