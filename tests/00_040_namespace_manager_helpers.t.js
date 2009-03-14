(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Namespace");
    
    this.ok(Joose.Kernel.Namespace.Manager, "Joose.Kernel.Namespace.Manager is here");
    this.ok(Joose.Kernel.Namespace.Keeper, "Joose.Kernel.Namespace.Keeper is here");
    
    this.ok(Joose.Kernel.Class.meta.hasAttribute('ns'), "Joose.Kernel.Class's meta has 'ns' attribute");
    this.ok(Joose.Managed.Role.meta.hasAttribute('ns'), "Joose.Kernel.Role's meta has 'ns' attribute");
    
    Class('TestClass', {
        have : {
            res : 'instance'
        },
        
        methods : {
            result : function() { return 'TestClass:instance' }
        },
        
        
        my : {
            have : {
                res : 'class'
            },
            
            methods : {
                result : function() { return 'TestClass:class' }
            }
        }
        
    });
    
    this.ok(typeof TestClass == 'function', "TestClass was created");
    this.ok(TestClass.my && TestClass.my.meta, "Class-level symbiont was created");
    
    this.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    this.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method");

    this.ok(TestClass.my.meta.hasAttribute('res'), "TestClass.my has 'res' attribute"); 
    this.ok(TestClass.my.meta.hasMethod('result'), "TestClass.my has 'result' method");
    
    
    var testClass = new TestClass();
    
    this.ok(testClass, "TestClass was instantiated");
    this.ok(testClass.res == 'instance', "Usual attribute was correctly installed");
    this.is(testClass.result(), 'TestClass:instance', "Method was correctly installed");
    
    this.ok(TestClass.my.res == 'class', "Symbiont's attribute was correctly installed");
    this.is(TestClass.my.result(), 'TestClass:class', "Symbiont's method was correctly installed");
    
    
//    //==================================================================================================================================================================================
//    this.diag("Role with symbiont creation");
//    
//    var Walk = new Joose.Managed.Role('Walk', { 
//        my : {
//            have : {
//                walking : false
//            },
//            
//            methods : {
//                walk : function (where) { this.walking = true },
//                stop : function () { this.walking = false }
//            }
//        }
//    }).c;
//    
//    this.ok(Walk.my.hasAttribute('walking') && Walk.my.getAttribute('walking').value == false, 'Walk has correct attribute walking');
//    this.ok(Walk.my.hasMethod('walk'), 'Walk has method walk');
//    this.ok(Walk.my.hasMethod('stop'), 'Walk has method stop');
//
//
//    //==================================================================================================================================================================================
//    this.diag("Role with symbiont applying");
//    
//    TestClass.meta.extend({ 
//        does : [ Walk ]
//    });
//    
//    this.ok(TestClass.my.meta.hasAttribute('walking'), "TestClass.my has 'walking' attribute"); 
//    this.ok(TestClass.my.meta.hasMethod('walk'), "TestClass.my has 'walk' method");
//    
//    
//    TestClass.my.walk('there');
//    this.ok(TestClass.my.walking, 'TestClass is walking');
//    TestClass.my.stop();
//    this.ok(!TestClass.my.walking, 'TestClass is not walking');
        
};

return testobj;
})()