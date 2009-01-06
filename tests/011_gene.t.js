(function () {
var testobj = new Test.TAP.Class();
testobj.plan(2)

testobj.testSanity = function() {
    this.diag("Gene")
    this.ok(Joose.Kernel.Gene, "GENE is here");
    this.ok(Joose.Kernel.Gene === Joose.Kernel.Gene.meta && Joose.Kernel.Gene.meta == Joose.Kernel.Gene.meta.meta, "Gene's meta is perfectly circular");
};

return testobj;
})()