Joose.Managed.PropertySet = new Joose.Proto.Class('Joose.Managed.PropertySet', {
    
    isa                       : Joose.Managed.Property,

    properties                : null,
    
    propertyMetaClass         : Joose.Managed.Property,
    
    
    initialize : function (name, props) {
        props = props || {}
        
        Joose.Managed.PropertySet.superClass.initialize.call(this, name, props)
        
        this.properties = props.properties || {}
    },
    
    
    addProperty : function (name, props) {
        props.definedIn = this
        return this.properties[name] = new (props.meta || this.propertyMetaClass)(name, props)
    },
    
    
    addPropertyObject : function (object) {
        return this.properties[object.name] = object
    },
    
    
    removeProperty : function (name) {
        var prop = this.properties[name]
        
        //probably should be 
        //this.properties[name] = undefined
        delete this.properties[name]
        
        return prop
    },
    
    
    haveProperty : function (name) {
        return this.properties[name] != null
    },
    

    haveOwnProperty : function (name) {
        return this.haveProperty(name)
    },
    
    
    getProperty : function (name) {
        return this.properties[name]
    },
    
    
    each : function (func, scope) {
        Joose.O.each(this.properties, function (property, name) {
            if (property != null) func.call(scope || this, property, name)
        })
    },
    
    
    eachAll : function (func, scope) {
        this.each(func, scope)
    },
    
    
    eachOwn : function (func, scope) {
        this.each(func, scope)
    },
    
    
    clone : function (name) {
        var propsCopy = Joose.O.copy(this.props, {})
        propsCopy.properties = Joose.O.getMutableCopy(this.properties)
        
        return new this.constructor(name || this.name, propsCopy)
    },
    
    
    cleanClone : function (name) {
        //XXX benchmark both variants
        var propsCopy = Joose.O.copy(this.props, {})
//        var propsCopy = Joose.O.getMutableCopy(this.props)
        propsCopy.properties = {}
        
        return new this.constructor(name || this.name, propsCopy)
    },
    
    
    alias : function (what) {
        var props = this.properties
        
        Joose.O.each(what, function (aliasName, originalName) {
            var original = props[originalName]
            
            if (original) this.addPropertyObject(original.clone(aliasName))
        }, this)
    },
    
    
    exclude : function (what) {
        Joose.A.each(what, function (name) {
            //not just "delete" to implicitly override possible inherited via getMutableCopy property
            if (this.properties[name]) this.properties[name] = undefined
        }, this)
    },
    
    
    flattenTo : function (target) {
        var targetProps = target.properties
        
        this.each(function (property, name) {
            var targetProperty = targetProps[name]
            
            if (targetProperty instanceof Joose.Managed.Property.ConflictMarker) return
            
            if (targetProperty == null) {
                target.addPropertyObject(property)
                return
            }
            
            if (targetProperty == property) return
            
            target.removeProperty(name)
            target.addProperty(name, {
                meta : Joose.Managed.Property.ConflictMarker
            })
        }, this)
    },
    
    
    composeTo : function (target) {
        this.each(function (property, name) {
            if (!target.haveOwnProperty(name)) target.addPropertyObject(property)
        })
    },
    
    
    composeFrom : function () {
        if (!arguments.length) return
        
        var flattening = this.cleanClone()
        
        Joose.A.each(arguments, function (arg) {
            var propSet = arg
            
            if (!(arg instanceof Joose.Managed.PropertySet)) {
                propSet = arg.propertySet
                
                if (arg.alias || arg.exclude) propSet = propSet.clone()
                if (arg.alias) propSet.alias(arg.alias)
                if (arg.exclude) propSet.exclude(arg.exclude)
            }
            
            propSet.flattenTo(flattening)
        })
        
        flattening.composeTo(this)
    },
    
    
    prepareApply : function (target) {
        this.each(function (property) {
            property.prepareApply(target)
        })
    },
    
    
    apply : function (target) {
        this.each(function (property) {
            property.apply(target)
        })
    },
    
    
    unapply : function (from) {
        this.each(function (property) {
            property.unapply(from)
        })
    }
    
    
}).c
