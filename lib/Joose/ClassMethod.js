Joose.Kernel.MetaClass.create('Joose.ClassMethod', {	
	isa : Joose.Kernel.ProtoClassMethod
});
    
Joose.Kernel.MetaClass.meta.addAttribute('classMethodConstructor', { init : Joose.ClassMethod, lazy : true });
