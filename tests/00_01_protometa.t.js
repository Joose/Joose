(function () {
var testobj = new Test.TAP.Class();
testobj.plan(5)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoMeta")
    this.ok(Joose.Kernel.ProtoMeta, "Joose.Kernel.ProtoMeta is here");
    this.ok(Joose.Kernel.ProtoMeta.meta == Joose.Kernel.ProtoMeta.meta.meta, "Joose.Kernel.ProtoMeta's meta is perfectly circular");
    this.ok(Joose.Kernel.ProtoMeta.meta.hasMethod('hasMethod'), "Joose.Kernel.ProtoMeta has hasMethod");
    this.ok(Joose.Kernel.ProtoMeta.meta.hasMethod('toString'), "Joose.Kernel.ProtoMeta has toString");
    this.is("" + Joose.Kernel.ProtoMeta.meta, "a Joose.Kernel.ProtoMeta", "Joose.Kernel.ProtoMeta.meta stringified correctly");
};

return testobj;
})()