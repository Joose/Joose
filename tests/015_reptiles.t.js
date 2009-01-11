(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Reptiles")
    this.ok(Joose.Kernel.Reptiles, "Reptiles is here");
    
    this.is("" + Joose.Kernel.Reptiles,'Joose.Kernel.Reptiles', "Joose.Kernel.Reptiles stringified correctly");
    this.is("" + Joose.Kernel.Reptiles.meta,'a Joose.Kernel.Species', "Reptiles's meta is a Viviparity");
    
    this.ok(Joose.Kernel.Reptiles.meta.isa(Joose.Kernel.Species), "Reptiles's meta ISA Species");
    this.ok(Joose.Kernel.Reptiles.meta.isa(Joose.Kernel.Species), "Reptiles's meta ISA Viviparity");
    this.ok(Joose.Kernel.Reptiles.meta.isa(Joose.Kernel.Species), "Reptiles's meta ISA Parthenogenesis");
    
    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('hasMethod'), 'Reptiles has hasMethod');
    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('toString'), "Reptiles has toString");

    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('defaultClassFunctionBody'), 'Reptiles can defaultClassFunctionBody - inherited(!)');
    this.ok(Joose.Kernel.Reptiles.meta.hasMethod('attributeMetaclass'), 'Reptiles can attributeMetaclass - inherited(!)');
};

return testobj;
})()