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
            
            this.setterName = 'set' + Joose.S.uppercaseFirst(this.publicName)
            this.getterName = 'get' + Joose.S.uppercaseFirst(this.publicName)
            
            if (this.is) {
                var methods = {}
                
                if (this.is == 'rw') methods[this.setterName] = this.getSetter()
                if (this.is == 'rw' || this.is == 'ro') methods[this.getterName] = this.getGetter()
                
                this.role = new Joose.Managed.Role('attribute:' + this.name, { methods : methods }).c
            }
        },

        
        prepareApply : function (targetClass) {
            if (this.role) targetClass.meta.extend({
                does : [ this.role ]
            })
        },
        
        
//        apply : function (target) {
//            this.SUPER(target)
//        },
        
        
        unapply : function (from) {
            if (this.role) from.meta.extend({
                doesnt : [ this.role ]
            })
            this.SUPER(from)
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
