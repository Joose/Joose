Joose.Kernel.MetaClass.create('Joose.ClassMethod', {	
	isa : Joose.Kernel.ProtoClassMethod,
	meta : Joose.Kernel.MetaClass
});
    
Joose.Kernel.MetaClass.meta.addAttribute('classMethodConstructor', { init : Joose.ClassMethod, lazy : true });
