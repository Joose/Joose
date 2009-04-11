Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
	isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta          : null,
    
    attributesMC         : Joose.Managed.StemElement.Attributes,
    methodsMC            : Joose.Managed.StemElement.Methods,
    requirementsMC       : Joose.Managed.StemElement.Requirements,
    methodsModifiersMC   : Joose.Managed.StemElement.MethodModifiers,
    
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
    },
    
    
    reCompose : function(){
        this.prepareApply(this.targetMeta.c);
        
        this.SUPER();
        
        this.apply(this.targetMeta.c);
    },
    
    
    deCompose : function(){
        this.unapply(this.targetMeta.c);
        
        this.SUPER();
    }
    
    
}).c;
