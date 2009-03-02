(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.Meta");
    
    this.ok(Joose.Managed.Meta, "Joose.Managed.Meta is here");
    
};

return testobj;
})()