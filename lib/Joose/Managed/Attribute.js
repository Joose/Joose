Joose.Managed.Attribute = new Joose.Managed.Class('Joose.Managed.Attribute', {
    
    isa : Joose.Managed.Property.Attribute,
    
    have : {
        is              : null,
        
        isPrivate       : null,
        
        role            : null,
        
        publicName      : null,
        setterName      : null,
        getterName      : null,
        
        required        : false
    },
    
    
    override : {
        
        computeValue : function () {
            if (typeof this.init != 'function') this.SUPER()
            
            var isPrivate = /^_/.test(this.name)
            
            this.publicName = this.name.replace(/^_+/, '')
            
            this.isPrivate = this.isPrivate || isPrivate
            
            if (this.isPrivate && !isPrivate) this.name = '__' + this.name
            
            this.setterName = this.setterName || this.getSetterName()
            this.getterName = this.getterName || this.getGetterName()
        },
        
        
        getGetterName : function () {
            return 'get' + Joose.S.uppercaseFirst(this.publicName)
        },


        getSetterName : function () {
            return 'set' + Joose.S.uppercaseFirst(this.publicName)
        },
        
        
        preApply : function (targetClass) {
            var targetMeta = targetClass.meta
            var setterName = this.setterName
            var getterName = this.getterName
            
            var methods = {}
            
            if (this.is == 'rw' && !targetMeta.hasMethod(setterName)) {
                methods[setterName] = this.getSetter()
                methods[setterName].ACCESSOR_FROM = this
            }
            
            if ((this.is == 'rw' || this.is == 'ro') && !targetMeta.hasMethod(getterName)) {
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
        
        getSetter : function () {
            var name = this.name
            
            return function (value) {
                this[name] = value
                return this
            }
        },
        
        
        getGetter : function () {
            var name = this.name
            
            return function () {
                return this[name]
            }
            
        }
        
    }

}).c
