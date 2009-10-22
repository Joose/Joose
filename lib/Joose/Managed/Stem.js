Joose.Managed.Stem = new Joose.Proto.Class('Joose.Managed.Stem', {
    
    isa                  : Joose.Managed.PropertySet.Composition,
    
    targetMeta           : null,
    
    attributesMC         : Joose.Managed.StemElement.Attributes,
    methodsMC            : Joose.Managed.StemElement.Methods,
    requirementsMC       : Joose.Managed.StemElement.Requirements,
    methodsModifiersMC   : Joose.Managed.StemElement.MethodModifiers,
    
    processOrder         : [ 'attributes', 'methods', 'requirements', 'methodsModifiers'],
    
    
    initialize : function (props) {
        Joose.Managed.Stem.superClass.initialize.call(this, props)
        
        var targetMeta = this.targetMeta
        
        this.addProperty('attributes', {
            meta : this.attributesMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('methods', {
            meta : this.methodsMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('requirements', {
            meta : this.requirementsMC,
            targetMeta : targetMeta
        })
        
        this.addProperty('methodsModifiers', {
            meta : this.methodsModifiersMC,
            targetMeta : targetMeta
        })
    },
    
    
    cloneProps : function () {
        var props = Joose.Managed.Stem.superClass.cloneProps.call(this)
        
        props.targetMeta = this.targetMeta
        
        return props
    },
    
    
    cleanClone : function (name) {
        var emptyClassMeta = new this.targetMeta.constructor()
        
        var props = this.cloneProps()
        
        props.properties = {}
        props.targetMeta = emptyClassMeta
        
        return new this.constructor(props)
        
//        var clone = this.clone(name)
//        
////        clone.properties = {}
//        
//        return clone
        
        
//        var emptyClassMeta = new this.targetMeta.constructor()
//        
//        return new this.constructor({
//            name        : name || this.name,
//            targetMeta  : emptyClassMeta
//        })
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
