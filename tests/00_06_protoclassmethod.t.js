(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(7)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoClassMethod")
    this.ok(Joose.Kernel.ProtoClassMethod, "Joose.Kernel.ProtoClassMethod is here");
    
    this.is("" + Joose.Kernel.ProtoClassMethod,'Joose.Kernel.ProtoClassMethod', "Joose.Kernel.ProtoClassMethod stringified correctly");
    this.is("" + Joose.Kernel.ProtoClassMethod.meta,'a Joose.Kernel.Inheritance', "Joose.Kernel.ProtoClassMethod's meta stringified to Joose.Kernel.Inheritance");
    
    this.ok(Joose.Kernel.ProtoClassMethod.meta.hasMethod('hasMethod'), 'Joose.Kernel.ProtoClassMethod has hasMethod');
    this.ok(Joose.Kernel.ProtoClassMethod.meta.hasMethod('toString'), "Joose.Kernel.ProtoClassMethod has toString");
    this.ok(Joose.Kernel.ProtoClassMethod.meta.hasMethod('addToClass'), 'Joose.Kernel.ProtoClassMethod has addToClass');
    
    this.ok(Joose.Kernel.ProtoClassMethod.meta.classIsa(Joose.Kernel.ProtoMethod), 'Joose.Kernel.ProtoClassMethod isa Joose.Kernel.ProtoMethod');
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)