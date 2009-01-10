(function () {
var testobj = new Test.TAP.Class();
testobj.plan(5)

testobj.testSanity = function() {
    this.diag("Gene")
    this.ok(Joose.Kernel.Gene, "GENE is here");
    this.ok(Joose.Kernel.Gene.meta == Joose.Kernel.Gene.meta.meta, "Gene's meta is perfectly circular");
    this.ok(Joose.Kernel.Gene.meta.hasMethod('hasMethod'), "Gene has hasMethod");
    this.ok(Joose.Kernel.Gene.meta.hasMethod('toString'), "Gene has toString");
    this.is("" + Joose.Kernel.Gene.meta, "a Joose.Kernel.Gene", "Joose.Kernel.Gene.meta stringified correctly");
};

return testobj;
})()