Joose.Managed.ClassStem.MethodModifiers = new Joose.Proto.Class('Joose.Managed.ClassStem.MethodModifiers', {
    
	isa : Joose.Managed.RoleStem.MethodModifiers,
    
    targetMeta             : null,
    
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetMeta        = props.targetMeta;
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
    }
    
    
//    reCompose : function(){
//        this.prepareApply(this.targetMeta.c);
//        
//        this.SUPER();
//        
//        this.apply(this.targetMeta.c);
//    },
//    
//    
//    deCompose : function(){
//        this.unapply(this.targetMeta.c);
//        
//        this.SUPER();
//    }    
    
}).c;