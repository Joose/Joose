(function () {
var testobj = new Test.TAP.Class();

testobj.plan(4)

testobj.testSanity = function() {
    var me = this;
    
    me.diag("Tests for the test system")
    me.ok(true, "Test succeeded");
    me.ok(!false, "Test failed");
    
    window.GLOBAL = true;
    
    if(joose.top.setTimeout) {
        setTimeout(function () {
            me.ok(true, "Asynchronous test succeeded");
            me.ok(!false, "Asynchronous test failed");
            
            //TODO
            //me.ok(window.GLOBAL, "Asynchronous test succeeded");
        }, 100)
    }
};
return testobj
})()