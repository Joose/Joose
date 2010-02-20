Joose.Managed.Attribute = new Joose.Managed.Class('Joose.Managed.Attribute', {
    
    isa : Joose.Managed.Property.Attribute,
    
    have : {
        is              : null,
        
        isPrivate       : false,
        
        role            : null,
        
        publicName      : null,
        setterName      : null,
        getterName      : null,
        
        required        : false
    },
    
    
    after : {
        initialize : function () {
            var name = this.name
            
            this.publicName = name.replace(/^_+/, '')
            
            this.slot = this.isPrivate ? '$$' + name : name
            
            this.setterName = this.setterName || this.getSetterName()
            this.getterName = this.getterName || this.getGetterName()
        }
    },
    
    
    override : {
        
        computeValue : function () {
            if (typeof this.init != 'function') this.SUPER()
        },
        
        
        preApply : function (targetClass) {
            var targetMeta = targetClass.meta
            var setterName = this.setterName
            var getterName = this.getterName
            
            var methods = {}
            
            if (/^rw/i.test(this.is) && !targetMeta.hasMethod(setterName)) {
                methods[setterName] = this.getSetter()
                methods[setterName].ACCESSOR_FROM = this
            }
            
            if (/^r/i.test(this.is) && !targetMeta.hasMethod(getterName)) {
                methods[getterName] = this.getGetter()
                methods[getterName].ACCESSOR_FROM = this
            }
            
            targetMeta.extend({
                methods : methods
            })
        },
        
        
        postUnApply : function (from) {
            var targetMeta = from.meta
            var setterName = this.setterName
            var getterName = this.getterName
            
            var setter = targetMeta.getMethod(setterName)
            var getter = targetMeta.getMethod(getterName)
            
            var removeMethods = []
            
            if (setter && setter.value.ACCESSOR_FROM == this) removeMethods.push(setterName)
            if (getter && getter.value.ACCESSOR_FROM == this) removeMethods.push(getterName)
            
            targetMeta.extend({
                removeMethods : removeMethods
            })
        }
        
    },
    
    
    methods : {
        
        getGetterName : function () {
            return 'get' + Joose.S.uppercaseFirst(this.publicName)
        },


        getSetterName : function () {
            return 'set' + Joose.S.uppercaseFirst(this.publicName)
        },
        
        
        getSetter : function () {
            var slot = this.slot
            
            return function (value) {
                this[slot] = value
                return this
            }
        },
        
        
        getGetter : function () {
            var slot = this.slot
            
            return function () {
                return this[slot]
            }
        },
        
        
        getValueFrom : function (instance) {
            var getterName      = this.getterName
            
            if (/^r/i.test(this.is) && instance.meta.hasMethod(getterName)) return instance[getterName]()
            
            return instance[this.slot]
        },
        
        
        setValueTo : function (instance, value) {
            var setterName      = this.setterName
            
            if (/^rw/i.test(this.is) && instance.meta.hasMethod(setterName)) instance[setterName](value)
            
            instance[this.slot] = value
        },
        
        
        initFromConfig : function (instance, config) {
            var name            = this.name
            
            var value, isSet = false
            
            if (config.hasOwnProperty(name)) {
                value = config[name]
                isSet = true
            } else 
                if (typeof this.init == 'function') {
                    value = this.init.call(instance, name, config)
                    isSet = true
                }
            
            if (isSet)
                this.setValueTo(instance, value)
            else 
                if (this.required) throw "Required attribute [" + name + "] is missed during initialization of " + instance
        }
    }

}).c
