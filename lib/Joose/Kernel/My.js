Joose.Kernel = function(){ throw "Modules may not be instantiated." };


//role-apply-able metaclass
Joose.Kernel.My = new Joose.Managed.Role('Joose.Kernel.My', {
    
    have : {
        my                          : null,
        myMeta                      : null,
        myMetaClass                 : null
    },
    
    
    after : {
        processStem : function(){
            var myClass = new (this.myMetaClass || this.meta.constructor)('my_of_' + this.name, {
                isa : this.superClass.meta.my &&  this.superClass.meta.my.constructor
            }).c;
            
            this.myMeta = myClass.meta;
            
            if (!(this.myMeta instanceof Joose.Managed.Role)) this.my = this.c.my = new myClass({ targetClass : this.c });
        }
    },
    
    
    before : {
        extend : function(props) {
            if (props.my) {
                this.myMeta.extend(props.my);
                delete props.my;
            }
        },
        
        
        addRole : function(){
            var myStem = this.myMeta.stem;
            myStem.open();
            
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role;
                
                if (role.meta.meta.hasAttribute('my')) myStem.addComposeInfo(role.meta.myMeta.stem);
            }, this)
            
            myStem.close();
        },
        
        
        removeRole : function(){
            var myStem = this.myMeta.stem;
            myStem.open();
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('my')) myStem.removeComposeInfo(role.meta.myMeta.stem);
            }, this)
            
            myStem.close();
        }
        
    }
    
}).c;