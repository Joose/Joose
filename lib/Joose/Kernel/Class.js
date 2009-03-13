//role-apply-able metaclass
Joose.Kernel.Class = new Joose.Managed.Class('Joose.Kernel.Class', {
    
    isa                         : Joose.Managed.Class,
    
    does                        : [ Joose.Kernel.My, Joose.Kernel.Namespace.Able ]
    
}).c;