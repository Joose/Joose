Joose.Meta = function () { throw "Modules may not be instantiated." }


Joose.Meta.Object = new Joose.Proto.Class('Joose.Meta.Object', {
    
    isa             : Joose.Proto.Object,
    
    initialize : function (config) {
            
        Joose.O.each(this.meta.attributes, function (attribute, name) {
            
            if (attribute instanceof Joose.Managed.Attribute) 
                attribute.initFromConfig(this, config)
            else 
                if (config.hasOwnProperty(name)) this[name] = config[name]
            
        }, this)
    }
    
}).c