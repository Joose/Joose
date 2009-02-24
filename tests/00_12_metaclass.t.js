(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();
testobj.plan(9)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.MetaClass")
    this.ok(Joose.Kernel.MetaClass, "Joose.Kernel.MetaClass is here");
    
    this.is("" + Joose.Kernel.MetaClass,'Joose.Kernel.MetaClass', "Joose.Kernel.MetaClass stringified correctly");
    this.is("" + Joose.Kernel.MetaClass.meta,'a Joose.Kernel.ProtoModule', "Joose.Kernel.MetaClass's meta stringified to Joose.Kernel.ProtoModule");
    
    this.ok(Joose.Kernel.MetaClass.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Methods of Joose.Kernel.MetaClass's meta are Joose.Kernel.ProtoMethods");
    this.ok(Joose.Kernel.MetaClass.meta.attributeConstructor == Joose.Kernel.ProtoAttribute, "Attributes of Joose.Kernel.MetaClass's meta are Joose.Kernel.ProtoAttribute");
    
    this.ok(Joose.Class.prototype.methodConstructor == Joose.Method, "Methods of Joose.Class itself were upgraded to Joose.Methods");
    this.ok(Joose.Class.prototype.attributeConstructor == Joose.Attribute, "Attributes of Joose.Class itself were upgraded to Joose.Attribute");
    
    var testClassMeta = new Joose.Class('TestClass');
	testClassMeta.addSuperClass(Joose.Class);
	var TestClass = testClassMeta.getClassObject();

    this.ok(TestClass.meta.attributeConstructor == Joose.Attribute, "Attributes of Joose.Class subclass were upgraded to Joose.Attribute");
    this.ok(TestClass.prototype.attributeConstructor == Joose.Attribute, "Attributes of further classes were also upgraded");
};

return testobj;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)