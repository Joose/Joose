(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(7)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoAttribute")
    this.ok(Joose.Kernel.ProtoAttribute, "Joose.Kernel.ProtoAttribute is here");
    
    this.is("" + Joose.Kernel.ProtoAttribute,'Joose.Kernel.ProtoAttribute', "Joose.Kernel.ProtoAttribute stringified correctly");
    this.is("" + Joose.Kernel.ProtoAttribute.meta,'a Joose.Kernel.Inheritable', "Joose.Kernel.ProtoAttribute's meta stringified to Joose.Kernel.Inheritable");
    
    this.ok(Joose.Kernel.ProtoAttribute.meta.hasMethod('hasMethod'), 'Joose.Kernel.ProtoAttribute has hasMethod');
    this.ok(Joose.Kernel.ProtoAttribute.meta.hasMethod('toString'), "Joose.Kernel.ProtoAttribute has toString");
    this.ok(Joose.Kernel.ProtoAttribute.meta.hasMethod('addToClass'), 'Joose.Kernel.ProtoAttribute has addToClass');
    
    this.ok(Joose.Kernel.ProtoAttribute.meta.classIsa(Joose.Kernel.ProtoAttribute), 'Joose.Kernel.ProtoAttribute isa Joose.Kernel.ProtoAttribute');
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)