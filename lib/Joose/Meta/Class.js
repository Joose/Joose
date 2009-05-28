Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Meta.MetaRole,
    
    have : {
    	defaultSuperClass : Joose.Meta.Object
    }
    
}).c