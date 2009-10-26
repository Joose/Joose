Joose.Managed.PropertySet.Namespace = new Joose.Proto.Class('Joose.Managed.PropertySet.Namespace', {
    
    isa : Joose.Managed.PropertySet,
    
    propertyMetaClass       : null,
    
    targetMeta              : null,
    
    container               : null,
    
    
    initialize : function (props) {
        Joose.Managed.PropertySet.Namespace.superClass.initialize.call(this, props)
        
        this.container = this.targetMeta.c
    },
    
    
    
    addProperty : function (name, value) {
        if (value && value.meta && value.meta.meta.hasAttribute('ns')) value.meta.parentNs = this.targetMeta.ns
        
        return this.container[name] = this.properties[name] = value
    },
    

    removeProperty : function (name) {
        try {
            delete this.container[name]
        } catch(e) {
            this.container[name] = undefined
        }
        
        return Joose.Managed.PropertySet.Namespace.superClass.removeProperty.call(this, name)
    }
    
}).c
