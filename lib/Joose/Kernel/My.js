Joose.Kernel = function(){ throw "Modules may not be instantiated." };


Joose.Kernel.My = new Joose.Managed.Role('Joose.Kernel.My', {
    
    have : {
        myClass                         : null
    },
    
    
    after : {
        processStem : function(extend){
            var thisMeta = this.meta;
            
            var myExtend = extend.my || {}; 
            myExtend.targetClass = this.c;
            delete extend.my;
            
            var myClass = this.myClass = thisMeta.subClassOf(this.superClass.meta.myClass || thisMeta.defaultSuperClass.meta.myClass || thisMeta.defaultSuperClass, myExtend);
            
            if (this instanceof Joose.Managed.Role)
                this.c.my = myClass.meta;
            else
                this.c.my = new myClass({ targetClass : this.c });
        }
    },
    
    
    before : {
        extend : function(props) {
            if (props.my) {
                this.myClass.meta.extend(props.my);
                delete props.my;
            }
        },
        
        
        addRole : function(){
            var myStem = this.myClass.meta.stem;
            myStem.open();
            
            Joose.A.each(arguments, function(arg){
                var role = (arg.meta instanceof Joose.Managed.Role) ? arg : arg.role;
                
                if (role.meta.meta.hasAttribute('myClass')) myStem.addComposeInfo(role.my.stem);
            }, this)
            
            myStem.close();
        },
        
        
        removeRole : function(){
            var myStem = this.myClass.meta.stem;
            myStem.open();
            
            Joose.A.each(arguments, function(role){
                if (role.meta.meta.hasAttribute('myClass')) myStem.removeComposeInfo(role.my.stem);
            }, this)
            
            myStem.close();
        }
        
    }
    
}).c;