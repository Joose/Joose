(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Species")
    this.ok(Joose.Kernel.Species, "Species is here");
    
    this.is("" + Joose.Kernel.Species,'Joose.Kernel.Species', "Joose.Kernel.Species stringified correctly");
    this.diag(Joose.Kernel.Species.meta._name);
    this.diag(Joose.Kernel.Species.meta.meta._name);
    this.diag(Joose.Kernel.Species.meta.meta.meta._name);
    this.is("" + Joose.Kernel.Species.meta,'a Joose.Kernel.Viviparity', "Species's meta is a Viviparity");
//    this.ok(Joose.Kernel.Species.meta.isa(Joose.Kernel.Viviparity), "Species's meta ISA Viviparity");
    
    this.ok(Joose.Kernel.Species.meta.hasMethod('hasMethod'), 'Species has hasMethod');
    this.ok(Joose.Kernel.Species.meta.hasMethod('toString'), "Species has toString");

    this.ok(Joose.Kernel.Species.meta.hasMethod('defaultClassFunctionBody'), 'Species can defaultClassFunctionBody - inherited(!)');
    this.ok(Joose.Kernel.Species.meta.hasMethod('attributeMetaclass'), 'Species can attributeMetaclass - inherited(!)');
};

return testobj;
})()