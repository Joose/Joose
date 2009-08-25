Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Meta.MetaRole,
    
//    have : {
//    	defaultSuperClass : Joose.Meta.Object
//    },
    
    
    methods : {
        
        defaultConstructor: function () {
            return function defaultConstructor(config) {
                
                config = config || {}
                
                Joose.O.each(this.meta.attributes, function(attribute, name) {
                    
                    if (attribute instanceof Joose.Managed.Attribute) {
                        var setValue, isSet = false
                        
                        if (config.hasOwnProperty(name)) {
                            setValue = config[name]
                            isSet = true
                        } else if (typeof attribute.props.init == 'function') {
                            setValue = attribute.props.init.call(this, name, config)
                            isSet = true
                        }
                        
                        
                        if (isSet)
                            if (this.meta.hasMethod(attribute.setterName)) 
                                this[attribute.setterName].call(this, setValue)
                            else
                                this[name] = setValue
                        else if (attribute.required) 
                            throw "Required attribute [" + name + "] is missed during initialization of " + this
                        
                    } else if (config.hasOwnProperty(name)) this[name] = config[name]
                    
                    
                }, this)
                
                
                this.initialize.apply(this, arguments)
            }
        }
        
    } 
    
}).c