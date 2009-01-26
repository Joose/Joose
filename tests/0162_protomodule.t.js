(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("ProtoModule")
    this.ok(Joose.Kernel.ProtoModule, "ProtoModule is here");
    
    this.is("" + Joose.Kernel.ProtoModule,'Joose.Kernel.ProtoModule', "Joose.Kernel.ProtoModule stringified correctly");
    this.is("" + Joose.Kernel.ProtoModule.meta,'a Joose.Kernel.Mammals', "ProtoModule's meta stringified to Mammals");
    
    this.ok(Joose.Kernel.ProtoModule.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Mammals's methods are ProtoMethods");
    
//    this.ok(Joose.Kernel.ProtoModule.meta.classIsa(Joose.Kernel.ProtoModule), "ProtoModule ISA ProtoModule");
//    this.ok(Joose.Kernel.ProtoModule.meta.classIsa(Joose.Kernel.Reptiles), "ProtoModule ISA Reptiles");
//    
//    this.ok(Joose.Kernel.ProtoModule.meta.isa(Joose.Kernel.Species), "ProtoModule's meta ISA Reptiles");
//    
//    this.ok(Joose.Kernel.ProtoModule.meta.hasMethod('isa'), "ProtoModule has isa - class method inheritance works");
//    this.ok(Joose.Kernel.ProtoModule.meta.classCan('isa'), "ProtoModule classCan isa");
//    
//    this.ok(Joose.Kernel.ProtoModule.isa(Joose.Kernel.ProtoModule), "ProtoModule ISA ProtoModule");
//    this.ok(Joose.Kernel.ProtoModule.isa(Joose.Kernel.Species), "ProtoModule ISA Species");
    
};

return testobj;
})()