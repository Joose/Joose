(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(21)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.Handlers")
    this.ok(Joose.Kernel.Handlers, "Joose.Kernel.Handlers is here");
    
    this.is("" + Joose.Kernel.Handlers,'Joose.Kernel.Handlers', "Joose.Kernel.Handlers stringified correctly");
    this.is("" + Joose.Kernel.Handlers.meta,'a Joose.Kernel.ClassMethods', "Joose.Kernel.Handlers's meta stringified to Joose.Kernel.ClassMethods");
    
    this.ok(Joose.Kernel.Handlers.meta.classIsa(Joose.Kernel.Handlers), "Joose.Kernel.Handlers ISA Joose.Kernel.Handlers");
    this.ok(Joose.Kernel.Handlers.meta.classIsa(Joose.Kernel.ClassMethods), "Joose.Kernel.Handlers ISA Joose.Kernel.ClassMethods");
    this.ok(Joose.Kernel.Handlers.meta.classIsa(Joose.Kernel.Inheritance), "Joose.Kernel.Handlers ISA Joose.Kernel.Inheritance");
    this.ok(Joose.Kernel.Handlers.meta.classIsa(Joose.Kernel.ClassSeparation), "Joose.Kernel.Handlers ISA Joose.Kernel.ClassSeparation");
    
    this.ok(Joose.Kernel.Handlers.meta.meta.isa(Joose.Kernel.ClassMethods), "Joose.Kernel.Handlers's meta ISA Joose.Kernel.ClassMethods");
    
    this.ok(Joose.Kernel.Handlers.meta.hasMethod('hasMethod'), 'Joose.Kernel.Handlers has hasMethod');
    this.ok(Joose.Kernel.Handlers.meta.hasMethod('toString'), "Joose.Kernel.Handlers has toString");

    this.ok(Joose.Kernel.Handlers.meta.hasMethod('defaultClassFunctionBody'), 'Joose.Kernel.Handlers can defaultClassFunctionBody - inherited');
    this.ok(Joose.Kernel.Handlers.meta.hasMethod('attributeMetaclass'), 'Joose.Kernel.Handlers can attributeMetaclass - inherited');
    
    Joose.Kernel.Handlers.meta.addClassMethod('works', function () { return 'works'} );
    this.ok(Joose.Kernel.Handlers.meta.hasMethod('works'), "Joose.Kernel.Handlers has works");
    this.ok(Joose.Kernel.Handlers.meta.classCan('works'), "Joose.Kernel.Handlers classCan works");
    this.ok(!Joose.Kernel.Handlers.meta.can('works'), "Joose.Kernel.Handlers can't works");
    this.is(Joose.Kernel.Handlers.works(), 'works', 'ClassMethod works');
    
    this.ok(Joose.Kernel.Handlers.isa(Joose.Kernel.Handlers), "Joose.Kernel.Handlers ISA Joose.Kernel.Handlers");
    this.ok(Joose.Kernel.Handlers.isa(Joose.Kernel.ClassMethods), "Joose.Kernel.Handlers ISA Joose.Kernel.ClassMethods");
    this.ok(Joose.Kernel.Handlers.isa(Joose.Kernel.Inheritance), "Joose.Kernel.Handlers ISA Joose.Kernel.Inheritance");
    this.ok(Joose.Kernel.Handlers.isa(Joose.Kernel.ClassSeparation), "Joose.Kernel.Handlers ISA Joose.Kernel.ClassSeparation");
    
    this.ok(Joose.Kernel.Handlers.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Joose.Kernel.Handlers's methods are Joose.Kernel.ProtoMethod");
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)