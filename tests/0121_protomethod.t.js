(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("ProtoMethod")
    this.ok(Joose.Kernel.ProtoMethod, "ProtoMethod is here");
    
    this.is("" + Joose.Kernel.ProtoMethod,'Joose.Kernel.ProtoMethod', "Joose.Kernel.ProtoMethod stringified correctly");
    this.is("" + Joose.Kernel.ProtoMethod.meta,'a Joose.Kernel.Parthenogenesis', "ProtoMethod's meta is a Parthenogenesis");
    
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('hasMethod'), 'ProtoMethod has hasMethod');
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('toString'), "ProtoMethod has toString");
    this.ok(Joose.Kernel.ProtoMethod.meta.hasMethod('addToClass'), 'ProtoMethod has addToClass');
};

return testobj;
})()