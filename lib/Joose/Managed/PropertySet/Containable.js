Joose.Managed.PropertySet.Containable = new Joose.Proto.Class('Joose.Managed.PropertySet.Containable', {
    
    isa                     : Joose.Managed.PropertySet.Mutable,

    //points to class
    targetMeta             : null,
    
    container               : null,

    
    initialize : function (name, props) {
        Joose.Managed.PropertySet.Containable.superClass.initialize.call(this, name, props)
        
        this.targetMeta        = props.targetMeta
        
        this.computeContainer()
    },
    
    
    computeContainer : function () {
        throw "Abstract method [computeContainer] of " + this + " was called"
    },
    
    
    addProperty : function (name, props) {
        return this.container[name] = Joose.Managed.PropertySet.Containable.superClass.addProperty.call(this, name, props)
    },
    

    addPropertyObject : function (object) {
        return this.container[object.name] = Joose.Managed.PropertySet.Containable.superClass.addPropertyObject.call(this, object)
    },
    

    removeProperty : function (name) {
        try {
            delete this.container[name]
        } catch(e) {
            this.container[name] = undefined
        }
        
        return Joose.Managed.PropertySet.Containable.superClass.removeProperty.call(this, name)
    },
    
    
    haveProperty : function (name) {
        return this.container[name] != null
    },
    
    
    haveOwnProperty : function (name) {
        return this.haveProperty(name) && this.container.hasOwnProperty(name)
    },
    
    
    getProperty : function (name) {
        return this.container[name]
    },
    
    
    cleanClone : function (name) {
        var clon = Joose.Managed.PropertySet.Containable.superClass.cleanClone.call(this, name)
        clon.container = {}
        
        return clon
    },
    
    
    eachAll : function (func, scope) {
        Joose.O.each(this.container, function (property, name) {
            if (property != null) func.call(scope || this, property, name)
        })
    },
    
    
    eachOwn : function (func, scope) {
        this.each(func, scope)
    }
    
}).c
