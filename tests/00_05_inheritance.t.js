(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(11)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.Inheritance")
    this.ok(Joose.Kernel.Inheritance, "Joose.Kernel.Inheritance is here");
    
    this.is("" + Joose.Kernel.Inheritance,'Joose.Kernel.Inheritance', "Joose.Kernel.Inheritance stringified correctly");
    this.is("" + Joose.Kernel.Inheritance.meta,'a Joose.Kernel.Inheritable', "Joose.Kernel.Inheritance's meta is a Joose.Kernel.Inheritable");
    
    this.ok(Joose.Kernel.Inheritance.meta.classIsa(Joose.Kernel.Inheritance), "Joose.Kernel.Inheritance ISA Joose.Kernel.Inheritance");
    this.ok(Joose.Kernel.Inheritance.meta.classIsa(Joose.Kernel.Inheritable), "Joose.Kernel.Inheritance ISA Joose.Kernel.Inheritable");
	this.ok(Joose.Kernel.Inheritance.meta.isa(Joose.Kernel.Inheritable), "Joose.Kernel.Inheritance's isa Joose.Kernel.Inheritable");    
    
    this.ok(Joose.Kernel.Inheritance.meta.hasMethod('hasMethod'), 'Joose.Kernel.Inheritance has hasMethod');
    this.ok(Joose.Kernel.Inheritance.meta.hasMethod('toString'), "Joose.Kernel.Inheritance has toString");
    this.ok(Joose.Kernel.Inheritance.meta.hasMethod('addSuperClass'), 'Joose.Kernel.Inheritance has addSuperClass');
    this.ok(Joose.Kernel.Inheritance.meta.hasAttribute('attributeMetaClass'), 'Joose.Kernel.Inheritance has attributeMetaClass');
    this.ok(Joose.Kernel.Inheritance.meta.hasMethod('defaultClassFunctionBody'), 'Joose.Kernel.Inheritance has defaultClassFunctionBody');
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)