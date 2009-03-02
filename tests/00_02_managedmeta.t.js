(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.Meta");
    
    this.ok(Joose.Managed.Meta, "Joose.Managed.Meta is here");
    
    
    //==================================================================================================================================================================================
    this.diag("Creation & managed extending (building)");
    
    var TestClass = new Joose.Managed.Meta('TestClass', null, null, {
        have : {
            res : true
        },
        
        methods : {
            result : function() { return '1' }
        }
    }).c;
    
    this.ok(typeof TestClass == 'function', "TestClass was created");
    
    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    this.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method");

    this.ok(TestClass.meta.hasOwnAttribute('res'), "TestClass has own 'res' attribute"); 
    this.ok(TestClass.meta.hasOwnMethod('result'), "TestClass has own 'result' method");
    
    this.ok(TestClass.meta.hasMethod('initialize'), "TestClass has 'initialize' method");
    this.ok(TestClass.meta.hasMethod('SUPER'), "TestClass has 'SUPER' method");
    
    this.ok(!TestClass.meta.hasOwnMethod('initialize'), "TestClass doesnt have own 'initialize' method");
    this.ok(!TestClass.meta.hasOwnMethod('SUPER'), "TestClass doesnt have own 'SUPER' method");
    
    var testClass = new TestClass();
    
    this.ok(testClass, "TestClass was instantiated");
    this.ok(testClass.res, "Attribute was correctly installed");
    this.is(testClass.result(), '1', "Method was correctly installed");
    
    
    //==================================================================================================================================================================================
    this.diag("Extending of builder");
    
    var TestClass1 = new Joose.Managed.Meta('TestClass1', null, null, {
        builder : {
            testHandler : function(meta, props){
                var name = props.name;
                var value = props.value;
                
                meta.addMethod(name, function(){
                    return value;
                });
            }
        },
        
        testHandler : {
            name : 'result',
            value : '1'
        }
        
    }).c;
    
    this.ok(TestClass1.meta.hasMethod('result'), "Method was added via extended builder");
    
    var testClass1 = new TestClass1();
    
    this.is(testClass1.result(), '1', "... and it works correctly");
    
};

return testobj;
})()