var metaClassMeta = new Joose.Kernel.Roles('Joose.Kernel.MetaClass');

metaClassMeta.initializeFromProps({
	
	isa : Joose.Kernel.Roles
    
});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();