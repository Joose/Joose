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
    
    this.ok(Joose.Kernel.Mammals.meta.hasMethod('isA'), "Mammals has isA");
    this.ok(Joose.Kernel.Mammals.meta.classCan('isA'), "Mammals classCan isA");
    this.ok(!Joose.Kernel.Mammals.meta.can('isA'), "Mammals can't isA");
    
    this.ok(Joose.Kernel.Mammals.isA(Joose.Kernel.Mammals), "Mammals ISA Mammals");
    this.ok(Joose.Kernel.Mammals.isA(Joose.Kernel.Species), "Mammals ISA Species");
    
};

return testobj;
})()