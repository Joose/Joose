Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
	isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta          : null,
    
    attributesMC         : Joose.Managed.ClassStem.Attributes,
    methodsMC            : Joose.Managed.ClassStem.Methods,
    requirementsMC       : Joose.Managed.ClassStem.Requirements,
    methodsModifiersMC   : Joose.Managed.ClassStem.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers'],
    
    
    initialize : function(name, props) {
        var targetMeta = this.targetMeta = props.targetMeta;
        
        this.SUPER(name, props);
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetMeta : targetMeta
        });
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetMeta : targetMeta
        });
        
        this.addProperty('requirements', {
            meta : this.requirementsMC,
            targetMeta : targetMeta
        });
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetMeta : targetMeta
        });
    },
    
    
    cleanClone : function (name){
        var emptyClass = new this.meta.constructor(null, {
            isa : Joose.Proto.Empty
        }).c;
        
        return new this.constructor(name || this.name, {
            targetMeta : emptyClass.meta
        }); 
    }
    
    
}).c;
