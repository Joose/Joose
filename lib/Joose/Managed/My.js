Joose.Managed.My = new Joose.Managed.Role('Joose.Managed.My', {
    
    have : {
        myClass                         : null
    },
    
    
    after : {
        processStem : function(extend){
            var thisMeta = this.meta;
            var isRole = this instanceof Joose.Managed.Role;
            
            var myExtend = extend.my || {}; 
            delete extend.my;
            
            var myClass = this.myClass = isRole ? new thisMeta.superClass(null, myExtend).c : thisMeta.subClassOf(this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass, myExtend);
            
            this.c.my = isRole ? myClass.meta : new myClass({ targetMeta : this });
        }
    },
    
    
    before : {
        extend : function(props) {
            if (props.my && this.myClass) {
                this.myClass.meta.extend(props.my);
                delete props.my;
            }
        },
        
        
        addRole : function() {
        	if (!this.myClass) return;
        	
            var myStem = this.myClass.meta.stem;
            myStem.open();
            
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role;
                
                if (role.meta.meta.hasAttribute('myClass')) myStem.addComposeInfo(role.my.stem);
            }, this)
            
            myStem.close();
        },
        
        
        removeRole : function(){
        	if (!this.myClass) return;
        	
            var myStem = this.myClass.meta.stem;
            myStem.open();
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('myClass')) myStem.removeComposeInfo(role.my.stem);
            }, this)
            
            myStem.close();
        }
        
    }
    
}).c;


Joose.MetaClass.meta.extend({
    does                        : [ Joose.Managed.My ]
});


Joose.MetaRole.meta.extend({
    does                        : [ Joose.Managed.My ]
});