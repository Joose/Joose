Joose.Kernel.MetaClass.create('Joose.Class', {
    isa: Joose.Kernel.MetaClass,
    
    has: {
        attributeMetaClass: { init: Joose.Attribute },
        methodMetaClass: { init: Joose.Method },
        classMethodMetaClass: { init: Joose.ClassMethod }
    }
});
