Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
	isa                  : Joose.Managed.PropertySet.Composition,
    
    targetClass          : null,
    
    attributesMC         : Joose.Managed.ClassStem.Attributes,
    methodsMC            : Joose.Managed.ClassStem.Methods,
    requirementsMC       : Joose.Managed.ClassStem.Requirements,
    methodsModifiersMC   : Joose.Managed.ClassStem.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers'],
    
    
    initialize : function(name, props) {
        var targetClass = this.targetClass = props.targetClass;
        
        this.SUPER(name, props);
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetClass : targetClass
        });
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetClass : targetClass
        });
        
        this.addProperty('requirements', {
            meta : this.requirementsMC,
            targetClass : targetClass
        });
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetClass : targetClass
        });
    },
    
    
    cleanClone : function (name){
        var emptyClass = new this.meta.constructor(null, {
            isa : Joose.Proto.Empty
        }).c;
        
        return new this.constructor(name || this.name, {
            targetClass : emptyClass
        }); 
    }
    
    
}).c;
