Joose.Meta = function () { throw "Modules may not be instantiated." }


Joose.Meta.Object = new Joose.Proto.Class('Joose.Meta.Object', {
    
    isa             : Joose.Proto.Object,
    
    initialize : function (config) {
            
        Joose.O.each(this.meta.attributes, function (attribute, name) {
            
            var haveInitValue = config.hasOwnProperty(name)
            
            if (attribute instanceof Joose.Managed.Attribute) {
                var setValue, isSet = false
                
                if (haveInitValue) {
                    setValue = config[name]
                    isSet = true
                } else 
                    if (typeof attribute.init == 'function') {
                        setValue = attribute.init.call(this, name, config)
                        isSet = true
                    }
                
                
                if (isSet)
                    if (this.meta.hasMethod(attribute.setterName)) 
                        this[attribute.setterName].call(this, setValue)
                    else
                        this[name] = setValue
                else 
                    if (attribute.required) throw "Required attribute [" + name + "] is missed during initialization of " + this
                
            } else 
                if (haveInitValue) this[name] = config[name]
            
            
        }, this)
    }
    
//    ,
//    detach : function () {
//        if (this.isDetached()) return this
//        
//        var detachedClass = new Joose.Meta.Class.Detached(null, { isa : this.constructor }).c
//        
//        detachedClass.meta.stem.open()
//        
//        detachedClass.prototype = this
//        
//        this.meta = detachedClass.meta
//        
//        var original = this.meta.originalClass = this.constructor
//        detachedClass.my = original.my
//        
//        this.constructor = detachedClass
//        
//        detachedClass.meta.stem.close()
//        
//        return this
//    },
//    
//    
//    attach : function () {
//        if (!this.isDetached()) return this
//        
//        this.meta.stem.open()
//        
//        this.constructor.prototype = {}
//        
//        delete this.constructor
//        delete this.meta
//        
//        //XXX hack for metaroles with custom builders
//        if (this.builder && this.builder.isDetached()) this.builder.attach()
//        if (this.stem && this.stem.isDetached()) this.stem.attach()
//        
//        return this
//    },
//    
//    
//    isDetached : function () {
//        return this.meta instanceof Joose.Meta.Class.Detached 
//    }
    
    
}).c