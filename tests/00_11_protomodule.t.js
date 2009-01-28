(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Joose.Kernel.ProtoModule")
    this.ok(Joose.Kernel.ProtoModule, "Joose.Kernel.ProtoModule is here");
    
    this.is("" + Joose.Kernel.ProtoModule,'Joose.Kernel.ProtoModule', "Joose.Kernel.ProtoModule stringified correctly");
    this.is("" + Joose.Kernel.ProtoModule.meta,'a Joose.Kernel.Roles', "Joose.Kernel.ProtoModule's meta stringified to Joose.Kernel.Roles");
    
    this.ok(Joose.Kernel.ProtoModule.meta.methodConstructor == Joose.Kernel.ProtoMethod, "Joose.Kernel.ProtoModule's methods are Joose.Kernel.ProtoMethod");
    
    this.is("" + __global__.meta, 'a Joose.Kernel.ProtoModule', "__global__'s meta stringified to Joose.Kernel.ProtoModule");
    this.ok(__global__.meta.meta.isa(Joose.Kernel.ProtoModule), "__global__'s meta isa Joose.Kernel.ProtoModule");
};

return testobj;
})()