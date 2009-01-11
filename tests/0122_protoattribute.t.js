(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("ProtoAttribute")
    this.ok(Joose.Kernel.ProtoAttribute, "ProtoAttribute is here");
    
    this.is("" + Joose.Kernel.ProtoAttribute,'Joose.Kernel.ProtoAttribute', "Joose.Kernel.ProtoAttribute stringified correctly");
    this.is("" + Joose.Kernel.ProtoAttribute.meta,'a Joose.Kernel.Parthenogenesis', "ProtoAttribute's meta stringified to Parthenogenesis");
    
    this.ok(Joose.Kernel.ProtoAttribute.meta.hasMethod('hasMethod'), 'ProtoAttribute has hasMethod');
    this.ok(Joose.Kernel.ProtoAttribute.meta.hasMethod('toString'), "ProtoAttribute has toString");
    this.ok(Joose.Kernel.ProtoAttribute.meta.hasMethod('apply'), 'ProtoAttribute has apply');
};

return testobj;
})()