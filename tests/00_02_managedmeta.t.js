(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.Meta");
    
    this.ok(Joose.Managed.Meta, "Joose.Managed.Meta is here");
    
    
    //==================================================================================================================================================================================
    this.diag("Creation");
    
    var TestClass = new Joose.Managed.Meta('TestClass', null, null, {
        have : {
            res : true
        },
        
        methods : {
            result : function() { return '1' }
        }
    }).c;
    
    this.ok(typeof TestClass == 'function', "TestClass was created");
    
//    debugger;
    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    this.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method");
    
    var testClass = new TestClass();
    
    this.ok(testClass, "TestClass was instantiated");
    this.ok(testClass.res, "Attribute was correctly installed");
    this.is(testClass.result(), '1', "Method was correctly installed");
};

return testobj;
})()