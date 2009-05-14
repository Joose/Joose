//XXX
//currently symbiont's metaclass is the same as metaclass of hoster, thus metaclasses cant have symbionts for now
//this can be fixed by reducing the metaclass on 1 level down (to this.meta.superClass) if this.constructor == this.superClass

Joose.Managed.My = new Joose.Managed.Role('Joose.Managed.My', {
    
    have : {
        myClass                         : null
    },
    
    
    methods : {
	    createMy : function (extend) {
	        var thisMeta = this.meta
	        var isRole = this instanceof Joose.Managed.Role
	        
	        var myExtend = extend.my || {}; 
	        delete extend.my
	        
	        var myClass = this.myClass = isRole ? new this.constructor(null, myExtend).c : this.subClassOf(this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass, myExtend)
	        
	        this.c.my = isRole ? myClass.meta : new myClass({ targetMeta : this })
	    }
    },
    
    
    override : {
        extend : function(props) {
            if (!this.superClass) debugger
            if (!this.myClass && this.superClass.meta.myClass) this.createMy(props)
            
            if (props.my)
            	if (!this.myClass) 
            		this.createMy(props)
            	else {
	                this.myClass.meta.extend(props.my)
	                delete props.my
            	}
            
            this.SUPER(props)
        }
    },
    
    
    before : {
        addRole : function() {
        	if (!this.myClass) return
        	
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role
                
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) myStem.addComposeInfo(role.my.stem)
            }, this)
            
            myStem.close()
        },
        
        
        removeRole : function(){
        	if (!this.myClass) return
        	
            var myStem = this.myClass.meta.stem
            myStem.open()
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('myClass') && role.meta.myClass) myStem.removeComposeInfo(role.my.stem)
            }, this)
            
            myStem.close()
        }
        
    }
    
}).c


//Joose.Meta.Class.meta.extend({
//    does                        : [ Joose.Managed.My ]
//})
//
//
//Joose.Meta.Role.meta.extend({
//    does                        : [ Joose.Managed.My ]
//})