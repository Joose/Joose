Joose.Managed.Stem = function(){ throw "Modules may not be instantiated." };

Joose.Managed.Stem.RoleStem = new Joose.Proto.Class('Joose.Managed.Stem.RoleStem', null, Joose.Managed.PropertySet.Composition, {
    
    attributesMC         : Joose.Managed.RoleStem.Attributes,
    methodsMC            : Joose.Managed.RoleStem.Methods,
    requirementMC        : Joose.Managed.RoleStem.Requirements,
    methodsModifiersMC   : Joose.Managed.RoleStem.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers'],

    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.createAttributes();
        this.createMethods();
        this.createMethodsModifiers();
        this.createRequirements();
    },
    
    
    createAttributes : function(){
        this.addProperty('attributes', {
            meta : this.attributesMC
        });
    },
    
    
    createMethods : function(){
        this.addProperty('methods', {
            meta : this.methodsMC
        });
    },
    
    
    createMethodsModifiers : function(){
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC
        });
    },
    
    
    createRequirements : function(){
        this.addProperty('requirements', {
            meta : this.requirementMC
        });
    }
    
}).c;
