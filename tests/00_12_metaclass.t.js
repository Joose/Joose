(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.MetaClass")
    this.ok(Joose.Kernel.MetaClass, "Joose.Kernel.MetaClass is here");
    
    this.is("" + Joose.Kernel.MetaClass,'Joose.Kernel.MetaClass', "Joose.Kernel.MetaClass stringified correctly");
    this.is("" + Joose.Kernel.MetaClass.meta,'a Joose.Kernel.Roles', "Joose.Kernel.MetaClass's meta stringified to Joose.Kernel.Roles");
    
    this.ok(Joose.Kernel.MetaClass.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Methods of Joose.Kernel.MetaClass's meta are Joose.Kernel.ProtoMethods");
    this.ok(Joose.Kernel.MetaClass.meta.attributeConstructor == Joose.Kernel.AdvancedProtoAttribute, "Attributes of Joose.Kernel.MetaClass's meta are Joose.Kernel.AdvancedProtoAttribute");
    
    this.ok(Joose.Kernel.MetaClass.prototype.methodConstructor == Joose.Method, "Methods of Joose.Kernel.MetaClass itself were upgraded to Joose.Methods");
    this.ok(Joose.Kernel.MetaClass.prototype.attributeConstructor == Joose.Attribute, "Attributes of Joose.Kernel.MetaClass itself were upgraded to Joose.Attribute");
    
    var testClassMeta = new Joose.Kernel.MetaClass('TestClass');
	testClassMeta.addSuperClass(Joose.Kernel.MetaClass);
	var TestClass = testClassMeta.getClassObject();

    this.ok(TestClass.meta.attributeConstructor == Joose.Attribute, "Attributes of Joose.Kernel.MetaClass subclass were upgraded to Joose.Attribute");
    this.ok(TestClass.prototype.attributeConstructor == Joose.Attribute, "Attributes of further classes were also upgraded");
};

return testobj;
})()