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
    this.is(testClass.res, '|before', "Only the 1st 'before' modifier remains");
    

    //==================================================================================================================================================================================
    this.diag("Mutability #2");
    
    var TestClass1 = new Joose.Managed.Class('TestClass1', {
        isa : TestClass,
        
        before : {
            process : function() { this.res += "|beforeTC1" }
        },
        
        after : {
            process : function() { this.res += "|afterTC1" }
        }
    }).c;
    
    var testClass1 = new TestClass1();

    this.is(testClass1.process(), 'TestClass', "Inherited method return correct value");
    this.is(testClass1.res, '|beforeTC1|before|afterTC1', "Only the 1st 'before' modifier remains");
    
    
    TestClass.meta.extend({
        after : {
            process : function() { this.res += "|after" }
        }
    });
    
    testClass1.res = '';
    
    this.is(testClass1.process(), 'TestClass', "Method return value from original function");
    this.is(testClass1.res, '|beforeTC1|before|after|afterTC1', "Modifier from subclass was correctly installed into 'modifying chain' ");
    
    
    //==================================================================================================================================================================================
    this.diag("Override & inheritance (SUPER call differentiation)");

    var TestClass3 = new Joose.Managed.Class('TestClass3', {
        methods : {
            inc : function (a) { return a + '|T3' }
        },
        
        override : {
            inc : function (a) {
                return this.SUPER(a) + '|T3O';
            }
        }
    }).c;
    
    var testClass3 = new TestClass3();    
    
    this.is(testClass3.inc('T'), 'T|T3|T3O', "'override' modifier works correctly");
    
    
    
    var TestClass4 = new Joose.Managed.Class('TestClass4', {
        isa : TestClass3,
        
        override : {
            inc : function (a) { return this.SUPER(a) + '|T4O1' }
        }
    }).c;
    
    var testClass4 = new TestClass4();    
    
    this.is(testClass4.inc('T'), 'T|T3|T3O|T4O1', "'override' modifier was applied to inherited method");
    
    
    
    TestClass3.meta.extend({
        removeModifier : [ 'inc' ]
    });
    
    this.is(testClass4.inc('T'), 'T|T3|T4O1', "'override' chain lost 'T3O' element");
    

    TestClass4.meta.extend({
        methods : {
            inc : function (a) { return a + '|T4' }
        }
    });
    
    this.is(testClass4.inc('T'), 'T|T4|T4O1', "'override' modifier was applied to own method");
    

    TestClass4.meta.extend({
        removeMethods : [ 'inc' ]
    });
    
    this.is(testClass4.inc('T'), 'T|T3|T4O1', "'override' modifier was applied to inherited method again");
    
    
    TestClass4.meta.extend({
        override : {
            inc : function (a) { return this.SUPERARG(arguments) + '|T4O2' }
        }
    });
    
    this.is(testClass4.inc('T'), 'T|T3|T4O1|T4O2', "2nd 'override' modifier was applied to inherited method + it works via SUPERARG");

    
    TestClass4.meta.extend({
        methods : {
            inc : function (a) { return a + '|T4' }
        }
    });
    
    this.is(testClass4.inc('T'), 'T|T4|T4O1|T4O2', "Two 'override's modifiers were applied to own method");
    
};

return testobj;
})()