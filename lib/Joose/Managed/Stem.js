Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
    isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta           : null,
    
    attributesMC         : Joose.Managed.StemElement.Attributes,
    methodsMC            : Joose.Managed.StemElement.Methods,
    requirementsMC       : Joose.Managed.StemElement.Requirements,
    methodsModifiersMC   : Joose.Managed.StemElement.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers' ],
    
    
    initialize : function (props) {
        Joose.Managed.Stem.superClass.initialize.call(this, props)
        
        var targetMeta = this.targetMeta
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            
            properties : targetMeta ? targetMeta.attributes : {}
        })
        
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            
            properties : targetMeta ? targetMeta.methods : {}
        })
        
        
        this.addProperty('requirements', {
            meta : this.requirementsMC
        })
        
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC
        })
    },
    
    
    reCompose : function () {
        this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.Stem.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function () {
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.Stem.superClass.deCompose.call(this)
    }
    
    
}).c
