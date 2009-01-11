(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Reptiles")
    this.ok(Joose.Kernel.Reptiles, "Reptiles is here");
    
    this.is("" + Joose.Kernel.Reptiles,'Joose.Kernel.Reptiles', "Joose.Kernel.Reptiles stringified correctly");
    this.is("" + Joose.Kernel.Reptiles.meta,'a Joose.Kernel.Species', "Reptiles's meta stringified to Species");
    
    this.ok(Joose.Kernel.Reptiles.meta.classIsa(Joose.Kernel.Reptiles), "Reptiles ISA Reptiles");
    this.ok(Joose.Kernel.Reptiles.meta.classIsa(Joose.Kernel.Species), "Reptiles ISA Species");
    this.ok(Joose.Kernel.Reptiles.meta.classIsa(Joose.Kernel.Viviparity), "Reptiles ISA Viviparity");
    this.ok(Joose.Kernel.Reptiles.meta.classIsa(Joose.Kernel.Parthenogenesis), "Reptiles ISA Parthenogenesis");
    
    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('hasMethod'), 'Reptiles has hasMethod');
    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('toString'), "Reptiles has toString");

    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('defaultClassFunctionBody'), 'Reptiles can defaultClassFunctionBody - inherited(!)');
    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('attributeMetaclass'), 'Reptiles can attributeMetaclass - inherited(!)');
};

return testobj;
})()