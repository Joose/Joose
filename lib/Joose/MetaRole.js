Joose.MetaRole = new Joose.MetaClass('Joose.MetaRole', {
    
    isa                         : Joose.Kernel.Role
    
}).c;


Joose.MetaRole.meta.extend({
    does                        : [ Joose.Namespace.Able ]
});
