/*
 * An Implementation of Traits
 * see http://www.iam.unibe.ch/~scg/cgi-bin/scgbib.cgi?query=nathanael+traits+composable+units+ecoop
 * 
 * Current Composition rules:
 * - At compile time we override existing (at the time of rule application) methods
 * - At runtime we dont
 */
Class('Joose.Role', {
    isa: Joose.Kernel.ProtoRole,
    meta: Joose.Class,
    
    has: {
        attributeMetaClass: { init: Joose.Attribute },
        methodMetaClass: { init: Joose.Method },
        classMethodMetaClass: { init: Joose.ClassMethod }
    }
    
});