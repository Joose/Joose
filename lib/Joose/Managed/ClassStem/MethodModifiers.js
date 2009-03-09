Joose.Managed.ClassStem.MethodModifiers = new Joose.Proto.Class('Joose.Managed.ClassStem.MethodModifiers', null, Joose.Managed.RoleStem.MethodModifiers, {
    
    targetClass             : null,
    
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetClass        = props.targetClass;
    },
    
    
    prepareApply : function(target){
        this.each(function(modifiersArr, name){
            Joose.A.each(modifiersArr, function(modifier) {
                modifier.prepareApply(target);
            });
        }, this);
    },

    
    apply : function(target){
        this.each(function(modifiersArr, name){
            Joose.A.each(modifiersArr, function(modifier) {
                modifier.apply(target);
            });
        }, this);
    },
    
    
    unapply : function(from){
        this.each(function(modifiersArr, name){
            for (var i = modifiersArr.length - 1; i >=0; i--) {
                modifiersArr[i].unapply(from);
            }
        }, this);
    },
    
    
    reCompose : function(){
        this.prepareApply(this.targetClass);
        
        this.SUPER();
        
        this.apply(this.targetClass);
    },
    
    
    deCompose : function(){
        this.unapply(this.targetClass);
        
        this.SUPER();
    }    
    
}).c;