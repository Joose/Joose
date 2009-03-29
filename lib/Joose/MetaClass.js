Joose.MetaClass = new Joose.Kernel.Class('Joose.MetaClass', {
    
    isa                         : Joose.Kernel.Class
    
}).c;


Joose.MetaClass.meta.extend({
    does                        : [ Joose.Namespace.Able ]
});
