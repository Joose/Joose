Joose.Meta.Class = new Joose.Managed.Class('Joose.Meta.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : Joose.Managed.Bootstrap,
    
    have : {
        defaultSuperClass       : Joose.Meta.Object
    },
    
    
    methods : {
        
        detach      : Joose.Meta.Object.meta.methods.detach,
        attach      : Joose.Meta.Object.meta.methods.attach,
        isDetached  : Joose.Meta.Object.meta.methods.isDetached
        
    }
    
}).c

