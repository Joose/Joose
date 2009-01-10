(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Parthenogenesis")
    this.ok(Joose.Kernel.Parthenogenesis, "Parthenogenesis is here");
    
    this.is("" + Joose.Kernel.Parthenogenesis,'Joose.Kernel.Parthenogenesis', "Joose.Kernel.Parthenogenesis stringified correctly");
    this.is("" + Joose.Kernel.Parthenogenesis.meta,'a Joose.Kernel.Gene', "Parthenogenesis's meta is a Gene");
    
    this.ok(Joose.Kernel.Parthenogenesis.meta.hasMethod('hasMethod'), 'Parthenogenesis has hasMethod');
    this.ok(Joose.Kernel.Parthenogenesis.meta.hasMethod('toString'), "Parthenogenesis has toString");
    this.ok(Joose.Kernel.Parthenogenesis.meta.hasMethod('defaultClassFunctionBody'), 'Parthenogenesis has defaultClassFunctionBody');
};

return testobj;
})()