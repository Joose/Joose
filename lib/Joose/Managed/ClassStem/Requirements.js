Joose.Managed.ClassStem.Requirements = new Joose.Proto.Class('Joose.Managed.ClassStem.Requirements', {
    
	isa : Joose.Managed.RoleStem.Requirements,
    
    targetClass             : null,
    
    
    initialize : function(name, props) {
        this.SUPER(name, props);
        
        this.targetClass        = props.targetClass;
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