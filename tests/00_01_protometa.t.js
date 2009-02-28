(function () {
var testobj = new Test.TAP.Class();
testobj.plan(7)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoMeta")
    this.ok(Joose.Kernel.ProtoMeta, "Joose.Kernel.ProtoMeta is here");
    this.ok(Joose.Kernel.ProtoMeta.meta == Joose.Kernel.ProtoMeta.meta.meta, "Joose.Kernel.ProtoMeta's meta is perfectly circular");
    
    this.is("" + Joose.Kernel.ProtoMeta.meta,'a Joose.Kernel.ProtoMeta', "Joose.Kernel.ProtoMeta's meta stringified correctly");
    
    this.ok(Joose.Kernel.ProtoMeta.meta.hasMethod('hasMethod'), "Joose.Kernel.ProtoMeta has hasMethod");
    
    this.ok(Joose.Kernel.ProtoMeta.meta.hasMethod('toString'), "Joose.Kernel.ProtoMeta has toString method");
    
    
    this.ok(!Joose.Kernel.ProtoMeta.meta.hasAttribute('toString'), "Joose.Kernel.ProtoMeta hasn't toString attribute");
    this.is("" + Joose.Kernel.ProtoMeta.meta, "a Joose.Kernel.ProtoMeta", "Joose.Kernel.ProtoMeta.meta stringified correctly");
};

return testobj;
})()