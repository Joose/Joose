Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Meta.MetaRole,
    
    
    methods : {
        
        defaultConstructor: function () {
            return function defaultConstructor(config) {
                
                Joose.O.each(this.meta.attributes, function(attribute, name) {
                    
                    var haveInitValue = config && typeof config == 'object' && config.hasOwnProperty(name)
                    
                    if (attribute instanceof Joose.Managed.Attribute) {
                        var setValue, isSet = false
                        
                        if (haveInitValue) {
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
                        
                    } else if (haveInitValue) this[name] = config[name]
                    
                    
                }, this)
                
                
                this.initialize.apply(this, arguments)
            }
        }
        
    } 
    
}).c