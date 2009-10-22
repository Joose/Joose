Joose.Managed.StemElement.Requirements = new Joose.Proto.Class('Joose.Managed.StemElement.Requirements', {

    isa                     : Joose.Managed.PropertySet.Mutable,
    
    targetMeta              : null,
    
    propertyMetaClass       : Joose.Managed.Property.Requirement,
    
    
    
    cloneProps : function () {
        var props = Joose.Managed.StemElement.Requirements.superClass.cloneProps.call(this)
        
        props.targetMeta = this.targetMeta
        
        return props
    },
    
    
    alias : function () {
    },
    
    
    exclude : function () {
    },
    
    
    flattenTo : function (target) {
        this.each(function (property, name) {
            if (!target.haveProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeTo : function (target) {
        this.flattenTo(target)
    },
    
    
    prepareApply : function (target) {
    }
    
}).c