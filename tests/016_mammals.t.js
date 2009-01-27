(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Mammals")
    this.ok(Joose.Kernel.Mammals, "Mammals is here");
    
    this.is("" + Joose.Kernel.Mammals,'Joose.Kernel.Mammals', "Joose.Kernel.Mammals stringified correctly");
    this.is("" + Joose.Kernel.Mammals.meta,'a Joose.Kernel.Reptiles', "Mammals's meta stringified to Reptiles");
    
    this.ok(Joose.Kernel.Mammals.meta.classIsa(Joose.Kernel.Mammals), "Mammals ISA Mammals");
    this.ok(Joose.Kernel.Mammals.meta.classIsa(Joose.Kernel.Reptiles), "Mammals ISA Reptiles");
    
    this.ok(Joose.Kernel.Mammals.meta.isa(Joose.Kernel.Species), "Mammals's meta ISA Reptiles");
    
    this.ok(Joose.Kernel.Mammals.meta.hasMethod('isa'), "Mammals has isa - class method inheritance works");
    this.ok(Joose.Kernel.Mammals.meta.classCan('isa'), "Mammals classCan isa");
    
    this.ok(Joose.Kernel.Mammals.isa(Joose.Kernel.Mammals), "Mammals ISA Mammals");
    this.ok(Joose.Kernel.Mammals.isa(Joose.Kernel.Species), "Mammals ISA Species");
    
    this.ok(Joose.Kernel.Mammals.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Mammals's methods are ProtoMethods");
    this.ok(Joose.Kernel.Mammals.prototype.methodConstructor == Joose.Kernel.ProtoMethod, "Mammals's methods are ProtoMethods #2");
    
    this.ok(Joose.Kernel.Mammals.meta.attributeConstructor == Joose.Kernel.ProtoAttribute, "Mammals's attributes are ProtoAttributes");
};

return testobj;
})()