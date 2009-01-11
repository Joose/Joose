(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("ProtoClassMethod")
    this.ok(Joose.Kernel.ProtoClassMethod, "ProtoClassMethod is here");
    
    this.is("" + Joose.Kernel.ProtoClassMethod,'Joose.Kernel.ProtoClassMethod', "Joose.Kernel.ProtoClassMethod stringified correctly");
    this.is("" + Joose.Kernel.ProtoClassMethod.meta,'a Joose.Kernel.Viviparity', "ProtoClassMethod's meta is a Viviparity");
    
    this.ok(Joose.Kernel.ProtoClassMethod.meta.hasMethod('hasMethod'), 'ProtoClassMethod has hasMethod');
    this.ok(Joose.Kernel.ProtoClassMethod.meta.hasMethod('toString'), "ProtoClassMethod has toString");
    this.ok(Joose.Kernel.ProtoClassMethod.meta.hasMethod('addToClass'), 'ProtoClassMethod has addToClass');
};

return testobj;
})()