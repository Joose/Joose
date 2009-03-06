Joose.Managed.Stem.ClassStem = new Joose.Proto.Class('Joose.Managed.Stem.ClassStem', null, Joose.Managed.Stem.RoleStem, {
    
    targetClass          : null,
    
    methodsMC            : Joose.Managed.ClassStem.Methods,
    methodsModifiersMC   : Joose.Managed.ClassStem.MethodModifiers,
    attributesMC         : Joose.Managed.ClassStem.Attributes,
    
    processOrder         : [ 'attributes', 'methods', 'methodsModifiers'],
    
    initialize : function(name, props) {
        this.targetClass = props.targetClass;
        
        this.SUPER(name, props);
    },
    
    
    createAttributes : function(){
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetClass : this.targetClass
        });
    },
    
    
    createMethods : function(){
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetClass : this.targetClass
        });
    },
    
    
    createMethodsModifiers : function(){
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetClass : this.targetClass
        });
    }
    
}).c;
