(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("MetaClass")
    this.ok(Joose.Kernel.MetaClass, "MetaClass is here");
    
    this.is("" + Joose.Kernel.MetaClass,'Joose.Kernel.MetaClass', "Joose.Kernel.MetaClass stringified correctly");
    this.is("" + Joose.Kernel.MetaClass.meta,'a Joose.Kernel.Mammals', "MetaClass's meta stringified to Mammals");
    
    this.ok(Joose.Kernel.MetaClass.meta.methodConstructor == Joose.Kernel.ProtoMethod, "MetaClass's methods are ProtoMethods");
    this.ok(Joose.Kernel.MetaClass.prototype.methodConstructor == Joose.Kernel.ProtoMethod, "MetaClass's methods are ProtoMethods");
    
    var testClassMeta = new Joose.Kernel.MetaClass('TestClass');
	testClassMeta.addSuperClass(Joose.Kernel.Mammals);
	var TestClass = testClassMeta.getClassObject();

    this.ok(TestClass.meta.attributeConstructor == Joose.Kernel.AdvancedProtoAttribute, "Attributes upgraded");
    this.ok(TestClass.prototype.attributeConstructor == Joose.Kernel.AdvancedProtoAttribute, "Attributes upgraded #2");
    
    
//    this.ok(Joose.Kernel.MetaClass.meta.classIsa(Joose.Kernel.MetaClass), "MetaClass ISA MetaClass");
//    this.ok(Joose.Kernel.MetaClass.meta.classIsa(Joose.Kernel.Reptiles), "MetaClass ISA Reptiles");
//    
//    this.ok(Joose.Kernel.MetaClass.meta.isa(Joose.Kernel.Species), "MetaClass's meta ISA Reptiles");
//    
//    this.ok(Joose.Kernel.MetaClass.meta.hasMethod('isa'), "MetaClass has isa - class method inheritance works");
//    this.ok(Joose.Kernel.MetaClass.meta.classCan('isa'), "MetaClass classCan isa");
//    
//    this.ok(Joose.Kernel.MetaClass.isa(Joose.Kernel.MetaClass), "MetaClass ISA MetaClass");
//    this.ok(Joose.Kernel.MetaClass.isa(Joose.Kernel.Species), "MetaClass ISA Species");
    
};

return testobj;
})()