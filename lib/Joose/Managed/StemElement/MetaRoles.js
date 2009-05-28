//XXX very similar to Requirements - common parent should be extracted
Joose.Managed.StemElement.MetaRoles = new Joose.Proto.Class('Joose.Managed.StemElement.MetaRoles', {

	isa : Joose.Managed.PropertySet.Mutable,
    
    //initially closed
    opened : 0,
    
    targetMeta             : null,
    
    propertyMetaClass : Joose.Managed.Property.MetaRole,
    
    
    initialize : function(name, props) {
        Joose.Managed.StemElement.MetaRoles.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
    },
    
    
    alias : function (){
    },
    
    
    exclude : function (){
    },
    
    
    flattenTo : function (target){
        this.each(function(property, name){
            if (!target.haveProperty(name)) target.addPropertyObject(property)
        }, this)
    },
    
    
    composeTo : function(target){
        this.flattenTo(target)
    },
    
    
    cleanClone : function (name) {
        var clone = Joose.Managed.StemElement.MetaRoles.superClass.cleanClone.call(this, name)
        
        clone.opened = 1
        
        return clone
    },
    
    
    prepareApply : function(targetClass) {
    },
    
    
    apply : function (targetClass) {
        if (Joose.O.isEmpty(this.properties)) return
        
        var metaRoles = []
        
        this.each(function (property) {
            metaRoles.push(property.value)
        })
        
        var metaInstance = targetClass.meta
        
        metaInstance.detach()
        
        metaInstance.meta.extend({
            does : metaRoles
        })
    },
    
    
    unapply : function (from) {
        if (Joose.O.isEmpty(this.properties)) return
        
        from.meta.attach()
    },
    
    
    reCompose : function(){
        this.prepareApply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.reCompose.call(this)
        
        this.apply(this.targetMeta.c)
    },
    
    
    deCompose : function(){
        this.unapply(this.targetMeta.c)
        
        Joose.Managed.StemElement.MetaRoles.superClass.deCompose.call(this)
    }
    
    
}).c