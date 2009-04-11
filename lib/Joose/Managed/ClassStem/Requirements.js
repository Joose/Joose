Joose.Managed.ClassStem.Requirements = new Joose.Proto.Class('Joose.Managed.ClassStem.Requirements', {
    
	isa : Joose.Managed.RoleStem.Requirements,
    
    targetMeta             : null,
    
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetMeta        = props.targetMeta;
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