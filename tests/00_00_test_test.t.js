(function (Class, Module, Role, Type, Prototype) {
return (function () {
var testobj = new Test.TAP.Class();

testobj.plan(4)

testobj.testSanity = function() {
    var me = this;
    
    me.diag("Tests for the test system")
    me.ok(true, "Test succeeded");
    me.ok(!false, "Test failed");
    
    if(joose.top.setTimeout) {
        setTimeout(function () {
            me.ok(true, "Asynchronous test succeeded");
            me.ok(!false, "Asynchronous test failed");
        }, 100)
    }
};
return testobj
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
