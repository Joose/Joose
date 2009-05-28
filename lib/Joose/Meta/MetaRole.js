Joose.Meta.MetaRole = new Joose.Managed.Role('Joose.Meta.MetaRole', {
    
    have : {
        metaRoles : null
    },
    
    
    builder : {
        
        override : {
            //executing body last
            _extend : function(props) {
                var targetMeta = this.targetMeta
                
                this._buildStart(targetMeta, props)
                
                props = props || {}
                
                var metaRoles = props.metaRoles
                delete props.metaRoles
                
                var removeMetaRoles = props.removeMetaRoles
                delete props.removeMetaRoles
                
                var does = props.does
                delete props.does
                
                var doesnot = props.doesnot || props.doesnt
                delete props.doesnot
                delete props.doesnt
                
                targetMeta.metaRoles.open()
                
                if (metaRoles) this.metaRoles(targetMeta, metaRoles)
                if (removeMetaRoles) this.removeMetaRoles(targetMeta, removeMetaRoles)
                if (does) this.does(targetMeta, does)
                if (doesnot) this.doesnot(targetMeta, doesnot)
                
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
        
        //NOTE - not 'after initialize'
        construct : function () {
            
            this.metaRoles = new Joose.Managed.StemElement.MetaRoles(name, {
                targetMeta : this
            })
        },
        
        
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
