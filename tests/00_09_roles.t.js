(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(13)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.Roles")
    this.ok(Joose.Kernel.Roles, "Joose.Kernel.Roles is here");
    
    this.is("" + Joose.Kernel.Roles,'Joose.Kernel.Roles', "Joose.Kernel.Roles stringified correctly");
    this.is("" + Joose.Kernel.Roles.meta,'a Joose.Kernel.Handlers', "Joose.Kernel.Roles's meta stringified to Joose.Kernel.Handlers");
    
    this.ok(Joose.Kernel.Roles.meta.classIsa(Joose.Kernel.Roles), "Joose.Kernel.Roles ISA Joose.Kernel.Roles");
    this.ok(Joose.Kernel.Roles.meta.classIsa(Joose.Kernel.Handlers), "Joose.Kernel.Roles ISA Joose.Kernel.Handlers");
    this.ok(Joose.Kernel.Roles.meta.isa(Joose.Kernel.ClassMethods), "Joose.Kernel.Roles ISA Joose.Kernel.ClassMethods");
    
    this.ok(Joose.Kernel.Roles.meta.hasMethod('isa'), "Joose.Kernel.Roles has isa - class method inheritance works");
    this.ok(Joose.Kernel.Roles.meta.classCan('isa'), "Joose.Kernel.Roles classCan isa");
    
    this.ok(Joose.Kernel.Roles.isa(Joose.Kernel.Roles), "Joose.Kernel.Roles ISA Joose.Kernel.Roles");
    this.ok(Joose.Kernel.Roles.isa(Joose.Kernel.ClassMethods), "Joose.Kernel.Roles ISA Joose.Kernel.ClassMethods");
    
    this.ok(Joose.Kernel.Roles.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Joose.Kernel.Roles's methods are Joose.Kernel.ProtoMethod");
    this.ok(Joose.Kernel.Roles.prototype.methodConstructor == Joose.Kernel.ProtoMethod, "Joose.Kernel.Roles's methods are Joose.Kernel.ProtoMethod #2");
    
    this.ok(Joose.Kernel.Roles.meta.isAbstract === false, "Attributes are initilized correctly");
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)