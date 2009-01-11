(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Viviparity")
    this.ok(Joose.Kernel.Viviparity, "Viviparity is here");
    
    this.is("" + Joose.Kernel.Viviparity,'Joose.Kernel.Viviparity', "Joose.Kernel.Viviparity stringified correctly");
    this.is("" + Joose.Kernel.Viviparity.meta,'a Joose.Kernel.Parthenogenesis', "Viviparity's meta is a Parthenogenesis");
    
    this.ok(Joose.Kernel.Viviparity.meta.isa(Joose.Kernel.Parthenogenesis), "Viviparity's meta ISA Parthenogenesis");
    
    this.ok(Joose.Kernel.Viviparity.meta.hasMethod('hasMethod'), 'Viviparity has hasMethod');
    this.ok(Joose.Kernel.Viviparity.meta.hasMethod('toString'), "Viviparity has toString");
    this.ok(Joose.Kernel.Viviparity.meta.hasMethod('addSuperClass'), 'Viviparity has addSuperClass');
    this.ok(Joose.Kernel.Viviparity.meta.hasAttribute('attributeConstructor'), 'Viviparity has attributeConstructor');
    this.ok(Joose.Kernel.Viviparity.meta.hasMethod('defaultClassFunctionBody'), 'Viviparity has defaultClassFunctionBody');
};

return testobj;
})()