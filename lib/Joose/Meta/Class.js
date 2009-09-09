Joose.Meta = function () { throw "Modules may not be instantiated." }

Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Managed.Bootstrap,
    
    methods : {
        
        defaultConstructor : function () {
            return function (param) {
                
                //required for FF3.5, which fails very badly w/o this line
                var config = param
                
                Joose.O.each(this.meta.attributes, function (attribute, name) {
                    
                    var haveInitValue = config && typeof config == 'object' && config.hasOwnProperty(name)
                    
                    if (attribute instanceof Joose.Managed.Attribute) {
                        var setValue, isSet = false
                        
                        if (haveInitValue) {
                            setValue = config[name]
                            isSet = true
                        } else if (typeof attribute.init == 'function') {
                            setValue = attribute.init.call(this, name, config)
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