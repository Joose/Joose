(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(8)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoMethod")
    this.ok(Joose.Kernel.ProtoMethod, "Joose.Kernel.ProtoMethod is here");
    
    this.is("" + Joose.Kernel.ProtoMethod,'Joose.Kernel.ProtoMethod', "Joose.Kernel.ProtoMethod stringified correctly");
    this.is("" + Joose.Kernel.ProtoMethod.meta,'a Joose.Kernel.ClassSeparation', "Joose.Kernel.ProtoMethod's meta stringified to Joose.Kernel.ClassSeparation");
    
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('hasMethod'), 'Joose.Kernel.ProtoMethod has hasMethod');
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('toString'), "Joose.Kernel.ProtoMethod has toString");
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('addToClass'), 'Joose.Kernel.ProtoMethod has addToClass');
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('isa'), 'Joose.Kernel.ProtoMethod has isa');
    
    this.ok(Joose.Kernel.ProtoMethod.meta.classIsa(Joose.Kernel.ProtoMethod), 'Joose.Kernel.ProtoMethod isa Joose.Kernel.ProtoMethod');
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)