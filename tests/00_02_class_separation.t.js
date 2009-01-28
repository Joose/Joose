(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ClassSeparation")
    this.ok(Joose.Kernel.ClassSeparation, "Joose.Kernel.ClassSeparation is here");
    
    this.is("" + Joose.Kernel.ClassSeparation,'Joose.Kernel.ClassSeparation', "Joose.Kernel.ClassSeparation stringified correctly");
    this.is("" + Joose.Kernel.ClassSeparation.meta,'a Joose.Kernel.ProtoMeta', "Joose.Kernel.ClassSeparation's meta stringified to Gene");
    
    this.ok(Joose.Kernel.ClassSeparation.meta.hasMethod('hasMethod'), 'Joose.Kernel.ClassSeparation has hasMethod');
    this.ok(Joose.Kernel.ClassSeparation.meta.hasMethod('toString'), "Joose.Kernel.ClassSeparation has toString");
    this.ok(Joose.Kernel.ClassSeparation.meta.hasMethod('defaultClassFunctionBody'), 'Joose.Kernel.ClassSeparation has defaultClassFunctionBody');
};

return testobj;
})()