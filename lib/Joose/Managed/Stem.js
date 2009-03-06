Joose.Managed.Stem = new Joose.Proto.Meta('Joose.Managed.Stem', null, Joose.Managed.PropertySet.Composition, {
    
    methodsMC            : Joose.Managed.RoleStem.Methods,
    methodsModifiersMC   : Joose.Managed.RoleStem.MethodModifiers,
    attributesMC         : Joose.Managed.RoleStem.Attributes,
    
    processOrder         : [ 'attributes', 'methods', 'methodsModifiers'],
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.createAttributes();
        this.createMethods();
        this.createMethodsModifiers();
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
    }
    
}).c;
