(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(14)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ClassMethods")
    this.ok(Joose.Kernel.ClassMethods, "Joose.Kernel.ClassMethods is here");
    
    this.is("" + Joose.Kernel.ClassMethods,'Joose.Kernel.ClassMethods', "Joose.Kernel.ClassMethods stringified correctly");
    this.is("" + Joose.Kernel.ClassMethods.meta,'a Joose.Kernel.Inheritance', "Joose.Kernel.ClassMethods's meta stringified to Joose.Kernel.Inheritance");
    
    this.ok(Joose.Kernel.ClassMethods.meta.classIsa(Joose.Kernel.ClassMethods), "Joose.Kernel.ClassMethods ISA Joose.Kernel.ClassMethods");
    this.ok(Joose.Kernel.ClassMethods.meta.classIsa(Joose.Kernel.Inheritance), "Joose.Kernel.ClassMethods ISA Joose.Kernel.Inheritance");
    this.ok(Joose.Kernel.ClassMethods.meta.classIsa(Joose.Kernel.Inheritable), "Joose.Kernel.ClassMethods ISA Joose.Kernel.Inheritable");
    
    this.ok(Joose.Kernel.ClassMethods.meta.meta.isa(Joose.Kernel.Inheritance), "Joose.Kernel.ClassMethods's meta ISA Joose.Kernel.Inheritance");
    this.ok(Joose.Kernel.ClassMethods.meta.meta.isa(Joose.Kernel.Inheritable), "Joose.Kernel.ClassMethods's meta ISA Joose.Kernel.Inheritable");
    
    this.ok(Joose.Kernel.ClassMethods.meta.hasMethod('hasMethod'), 'Joose.Kernel.ClassMethods has hasMethod');
    this.ok(Joose.Kernel.ClassMethods.meta.hasMethod('toString'), "Joose.Kernel.ClassMethods has toString");
    this.ok(Joose.Kernel.ClassMethods.meta.hasMethod('addClassMethod'), "Joose.Kernel.ClassMethods has addClassMethod");

    this.ok(Joose.Kernel.ClassMethods.meta.hasMethod('defaultClassFunctionBody'), 'Joose.Kernel.ClassMethods can defaultClassFunctionBody - inherited');
    this.ok(Joose.Kernel.ClassMethods.meta.hasMethod('attributeMetaclass'), 'Joose.Kernel.ClassMethods can attributeMetaclass - inherited');
    
    this.ok(Joose.Kernel.ClassMethods.meta.methodMetaClass == Joose.Kernel.ProtoMethod, "Joose.Kernel.ClassMethods's methods are Joose.Kernel.ProtoMethod");
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)