var metaClassMeta = new Joose.Kernel.ProtoModule('Joose.Kernel.MetaClass');

metaClassMeta.initializeFromProps({
	
	isa : Joose.Kernel.ProtoModule
    
});


Joose.Kernel.MetaClass = metaClassMeta.getClassObject();