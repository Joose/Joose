Joose.Trait = function () { throw "Modules may not be instantiated." }

Joose.Trait.Able = new Joose.Managed.Role('Joose.Trait.Able', {
    
    have : {
        metaRoles       : null,
        
        isDetached      : false,
        
        firstPass       : true
    },
    
    
    override : {
        
        BUILD : function () {
            var props = this.SUPERARG(arguments)
            
            if (props.isDetached) return props
            
            var traits = Joose.O.wantArray(props.trait || props.traits || [])
            delete props.trait
            delete props.traits
            
            Joose.A.each(Joose.O.wantArray(props.does || []), function (arg) {
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.isDetached) traits.push(role.meta.meta.superClass)
            }, this)
            
            if (traits.length) props.traits = traits 
            
            return props
        }
    },
    
    
    builder : {
        
        after : {
            
            _buildStart : function (targetMeta, props) {
                targetMeta.isDetached = props.isDetached
                
                delete props.isDetached
                
                Joose.A.each([ 'trait', 'traits', 'removeTrait', 'removeTraits', 'does', 'doesnot', 'doesnt' ], function (builder) {
                    if (props[builder]) {
                        this[builder](targetMeta, props[builder])
                        delete props[builder]
                    }
                }, this)
                
            },
            
            
            _buildComplete : function (targetMeta, props) {
                this.firstPass = false
            }
        },

        
        methods : {
            
            trait : function () {
                this.traits.apply(this, arguments)
            },
            
            
            traits : function () {
                if (this.firstPass) return
                
                if (!this.isDetached) throw "Can't apply trait to not detached class"
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.addProperty(metaRole.meta.name, { init : metaRole })
                })
            },
            
            
            removeTrait : function () {
                this.removeTraits.apply(this, arguments)
            },
             
            
            removeTraits : function () {
                if (!this.isDetached) throw "Can't remove trait from not detached class"
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.removeProperty(metaRole.meta.name)
                })
            }
        }
            
    },
    
    
    before : {
        
        addRole : function () {
            if (this.firstPass) return
            
            Joose.A.each(arguments, function (arg) {
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
//                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.addComposeInfo(role.meta.metaRoles)
            }, this)
            
        },
        
        
        removeRole : function () {
            if (this.firstPass) return
            
            Joose.A.each(arguments, function (role) {
//                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.removeComposeInfo(role.meta.metaRoles)
            }, this)
            
        }
        
    }
    
}).c
