Joose.Meta.MetaRole = new Joose.Managed.Role('Joose.Meta.MetaRole', {
    
    have : {
        metaRoles : null
    },
    
    
    builder : {
        
        override : {
            
            _extend : function(props) {
                var targetMeta = this.targetMeta
                
                this._buildStart(targetMeta, props)
                
                props = props || {}
                
                
                targetMeta.metaRoles.open()
                
                Joose.A.each([ 'metaRoles', 'removeMetaRoles', 'does', 'doesnot', 'doesnt' ], function (builder) {
                    if (props[builder]) {
                        this[builder](targetMeta, props[builder])
                        delete props[builder]
                    }
                }, this)
                
                targetMeta.metaRoles.close()
                
                this.SUPER(props)
                
                this._buildComplete(targetMeta, props)
            }
        },
        
    	
    	methods : {
            
		    metaRoles : function(targetClassMeta, info) {
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.addProperty(metaRole.meta.name, { init : metaRole })
                })
		    },
            
            
            removeMetaRoles : function(targetClassMeta, info) {
                
                Joose.A.each(Joose.O.wantArray(info), function (metaRole) {
                    
                    targetClassMeta.metaRoles.removeProperty(metaRole.meta.name)
                })
            } 
    	}
    		
    },
    
    
    before : {
        
        addRole : function() {
            
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Class) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.addComposeInfo(role.meta.metaRoles)
            }, this)
            
        },
        
        
        removeRole : function(){
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('metaRoles') && role.meta.metaRoles) this.metaRoles.removeComposeInfo(role.meta.metaRoles)
            }, this)
            
        }
        
    },
    
    
    after : {
        
        processSuperClass : function () {
            var metaRoles = this.metaRoles = new Joose.Managed.StemElement.MetaRoles(name, {
                targetMeta : this
            })
            
            var superClass = this.superClass
            var superMeta = superClass.meta
            
            //manual compose info manipulation.. ok, just hack )
            if (superClass != Joose.Proto.Empty && superClass != Joose.Proto.Object && superMeta.meta.hasAttribute('metaRoles') && superMeta.metaRoles)
                metaRoles.addComposeInfo(superMeta.metaRoles)
                
            //metaRoles are initially closed - they'll be opened in 'extend'
            metaRoles.opened = 0
        }
    }
    
    
}).c



//Joose.Meta.Class.meta.extend({
//    does                        : [ Joose.Meta.MetaRole ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ Joose.Meta.MetaRole ]
//})
