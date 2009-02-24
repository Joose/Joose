Joose.Kernel.MetaClass.create('Joose.Class', {
	isa : Joose.Kernel.MetaClass,
    
    has : {
        attributeConstructor : { init : Joose.Attribute },
        methodConstructor : { init : Joose.Method },
        classMethodConstructor : { init : Joose.ClassMethod }
    }
});
