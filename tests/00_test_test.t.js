(function () {
var testobj = new Test.TAP.Class();

testobj.plan(4)

testobj.testSanity = function() {
    var me = this;
    
    this.diag("Tests for the test system")
    this.ok(true, "Test succeeded");
    this.ok(false, "Test failed");
    
    window.setTimeout(function () {
        me.ok(true, "Asynchronous test succeeded");
        me.ok(false, "Asynchronous test failed");
    }, 100)
};
return testobj
})()