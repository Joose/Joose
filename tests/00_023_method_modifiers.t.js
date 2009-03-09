(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Managed.Class");
    
    this.ok(Joose.Managed.Property.MethodModifier, "Joose.Managed.Property.MethodModifier is here");
    this.ok(Joose.Managed.Property.MethodModifier.Before, "Joose.Managed.Property.MethodModifier.Before is here");
    this.ok(Joose.Managed.Property.MethodModifier.After, "Joose.Managed.Property.MethodModifier.After is here");
    this.ok(Joose.Managed.Property.MethodModifier.Override, "Joose.Managed.Property.MethodModifier.Override is here");
    this.ok(Joose.Managed.Property.MethodModifier.Around, "Joose.Managed.Property.MethodModifier.Around is here");
    this.ok(Joose.Managed.Property.MethodModifier.Augment, "Joose.Managed.Property.MethodModifier.Augment is here");
    
    
    //==================================================================================================================================================================================
    this.diag("Before & After");
    
    var TestClass = new Joose.Managed.Class('TestClass', {
        have : {
            res : ""
        },
        
        methods : {
            process : function() { return 'TestClass' }
        },
        
        before : {
            process : function() { this.res += "|before" }
        },
        
        after : {
            process : function() { this.res += "|after" }
        }
    }).c;
    
    this.ok(typeof TestClass == 'function', "TestClass was created");
    
    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    this.ok(TestClass.meta.hasMethod('process'), "TestClass has 'result' method");

    var testClass = new TestClass();
    
    this.ok(testClass && testClass.res == "", "TestClass was instantiated and 'res' have correct initial value");
    this.is(testClass.process(), 'TestClass', "Method return value from original function");
    this.is(testClass.res, '|before|after', "'before' and 'after' modifiers were applied");
    
    
    //==================================================================================================================================================================================
    this.diag("Mutability #1");
    
    TestClass.meta.extend({
        before : {
            process : function() { this.res += "|before2" }
        },
        
        after : {
            process : function() { this.res += "|after2" }
        }
    });
    
    testClass.res = '';
    
    this.is(testClass.process(), 'TestClass', "Method return value from original function");
    this.is(testClass.res, '|before2|before|after|after2', "New 'before' and 'after' modifiers were applied");

    
    TestClass.meta.extend({
        removeModifier : [ 'process', 'process', 'process' ]
    });
    
    testClass.res = '';
    
    this.is(testClass.process(), 'TestClass', "Method return value from original function");
    this.diag(testClass.res);
    this.is(testClass.res, '|before', "Only the 1st 'before' modifier remains");
    
//    //==================================================================================================================================================================================
//    this.diag("Extending of builder");
//    
//    var TestClass1 = new Joose.Managed.Class('TestClass1', {
//        isa : TestClass,
//        
//        builder : {
//            testHandler : function(meta, props){
//                var name = props.name;
//                var value = props.value;
//                
//                meta.addMethod(name, function(){
//                    return value;
//                });
//            }
//        },
//        
//        testHandler : {
//            name : 'result',
//            value : 'TestClass1'
//        }
//        
//    }).c;
//    
//    var testClass1 = new TestClass1();
//    
//    this.ok(TestClass1.meta.hasOwnMethod('result') && testClass1.result() == 'TestClass1', "... and it works correctly");
//
//    
//    //==================================================================================================================================================================================
//    this.diag("Inheritance of extended builder");
//    
//    var TestClass11 = new Joose.Managed.Class('TestClass11', {
//        isa : TestClass1,
//        
//        testHandler : {
//            name : 'result',
//            value : 'TestClass11'
//        }
//    }).c;
//    
//    var testClass11 = new TestClass11();
//    
//    this.ok(TestClass11.meta.hasOwnMethod('result') && testClass11.result() == 'TestClass11', "... and it works correctly");
//    
//
//    //==================================================================================================================================================================================
//    this.diag("Method & Attribute objects");
//    
//    var result = TestClass1.meta.getMethod('result');
//    
//    this.ok(result instanceof Joose.Managed.Property.Method, "'result' method have a meta object - instance of Joose.Managed.Property.Method");
//    
//    this.ok(result.value == TestClass1.prototype.result._contain, "'result' method is a wrapper");
//    
//    
//    var res = TestClass1.meta.getAttribute('res');
//    
//    this.ok(res instanceof Joose.Managed.Property.Attribute, "'res' attribute have a meta object - instance of Joose.Managed.Property.Attribute");
//    
//    this.ok(res.value == TestClass1.prototype.res, "Default value of 'res' attribute is a 'value' property of its meta");
//    
//    this.ok(!TestClass1.meta.hasOwnAttribute('res'), "TestClass1 dont have own 'res' attribute - its inherited from TestClass");
//    
//    
//    //==================================================================================================================================================================================
//    this.diag("Mutability");
//    
//    this.ok(TestClass1.meta.hasOwnMethod('result'), "TestClass1 has own 'result' method");
//    
//    TestClass1.meta.extend({
//        removeMethods : ['result']
//    });
//    
//    this.ok(!TestClass1.meta.hasOwnMethod('result'), "TestClass1 dont have own 'result' method");
//    this.ok(TestClass1.meta.hasMethod('result'), "TestClass1 still have inherited 'result' method");
//    this.is(testClass1.result(), 'TestClass', "... and it works correctly");
//    
//    this.ok(TestClass1.meta.hasAttribute('res'), "TestClass1 still has 'res' attribute after extension");
//    
//    TestClass.meta.extend({
//        removeMethods : ['result']
//    });
//    this.ok(!TestClass1.meta.hasMethod('result'), "TestClass1 now dont have any 'result's methods");
//    
//
//    //==================================================================================================================================================================================
//    this.diag("SUPER call");
//
//    var TestClass3 = new Joose.Managed.Class('TestClass3', {
//        methods : {
//            inc : function (a) { return a + 1 }
//        }
//    }).c;
//    
//    var TestClass4 = new Joose.Managed.Class('TestClass4', {
//        isa : TestClass3,
//        
//        methods : {
//            inc : function (a) { return this.SUPER(a) + 1 }
//        }
//    }).c;
//    
//    var TestClass5 = new Joose.Managed.Class('TestClass4', {
//        isa : TestClass4,
//        
//        methods : {
//            inc : function (a) { return this.SUPERARG(arguments) + 1 }
//        }
//    }).c;
//    
//    var testClass5 = new TestClass5();
//    
//    this.is(testClass5.inc(1), 4, "'inc' was overriden and works correctly");

    
    
};

return testobj;
})()