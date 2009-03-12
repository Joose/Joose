Joose.Kernel.Role = new Joose.Kernel.Class('Joose.Kernel.Role', {
    
    isa                     : Joose.Managed.Role,

    stemClass               : Joose.Kernel.Class.meta.stem.constructor,
    builderClass            : Joose.Kernel.Class.meta.builder.constructor,
        
    have : {
        myMetaClass         : Joose.Managed.Role
    },
    
    does                    : [ Joose.Kernel.My ],
    
    
    constructor : function (){
        this.initialize.apply(this, arguments);
    }
    
    
}).c;