(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(6)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.Inheritable")
    this.ok(Joose.Kernel.Inheritable, "Joose.Kernel.Inheritable is here");
    
    this.is("" + Joose.Kernel.Inheritable,'Joose.Kernel.Inheritable', "Joose.Kernel.Inheritable stringified correctly");
    this.is("" + Joose.Kernel.Inheritable.meta,'a Joose.Kernel.ProtoMeta', "Joose.Kernel.Inheritable's meta stringified to Gene");
    
    this.ok(Joose.Kernel.Inheritable.meta.hasMethod('hasMethod'), 'Joose.Kernel.Inheritable has hasMethod');
    this.ok(Joose.Kernel.Inheritable.meta.hasMethod('toString'), "Joose.Kernel.Inheritable has toString");
    this.ok(Joose.Kernel.Inheritable.meta.hasMethod('defaultClassFunctionBody'), 'Joose.Kernel.Inheritable has defaultClassFunctionBody');
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)