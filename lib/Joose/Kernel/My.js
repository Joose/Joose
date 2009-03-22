Joose.Kernel.My = new Joose.Kernel.Role('Joose.Kernel.My', {
    
    have : {
        myClass                         : null
    },
    
    
    after : {
        processStem : function(extend){
            var thisMeta = this.meta;
            
            var myExtend = extend.my || {}; 
            delete extend.my;
            
            var myClass = this.myClass = this instanceof Joose.Kernel.Role ? 
            	new thisMeta.superClass(null, myExtend).c 
        	: 
        		thisMeta.subClassOf(this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass, myExtend);
            
            if (this instanceof Joose.Kernel.Role)
                this.c.my = myClass.meta;
            else
                this.c.my = new myClass({ targetClass : this.c });
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


Joose.Kernel.Class.meta.extend({
    does                        : [ Joose.Kernel.My ]
});


Joose.Kernel.Role.meta.extend({
    does                        : [ Joose.Kernel.My ]
});