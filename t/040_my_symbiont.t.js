StartTest(function(t) {
	t.plan(22)
	
    //==================================================================================================================================================================================
    t.diag("Symbiont - separate, built-in class, (analog of class-methods + class-attributes + class-roles + ...)")
    
    t.ok(Joose.Meta.Class, "Joose.Meta.Class is here")
    t.ok(Joose.Meta.Role, "Joose.Meta.Role is here")
    
    t.ok(Joose.Meta.Class.meta.hasAttribute('myClass'), "Joose.Meta.Class has 'myClass' attribute")
    t.ok(Joose.Meta.Role.meta.hasAttribute('myClass'), "Joose.Meta.Role has 'myClass' attribute")
    
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
        
    })
    
    t.ok(typeof TestClass == 'function', "TestClass was created")
    t.ok(TestClass.my && TestClass.my.meta, "Class-level symbiont was created")
    
    t.ok(TestClass.meta.hasAttribute('res'), "TestClass has 'res' attribute"); 
    t.ok(TestClass.meta.hasMethod('result'), "TestClass has 'result' method")

    t.ok(TestClass.my.meta.hasAttribute('res'), "TestClass.my has 'res' attribute"); 
    t.ok(TestClass.my.meta.hasMethod('result'), "TestClass.my has 'result' method")
    
    
    var testClass = new TestClass()
    
    t.ok(testClass, "TestClass was instantiated")
    t.ok(testClass.res == 'instance', "Usual attribute was correctly installed")
    t.is(testClass.result(), 'TestClass:instance', "Method was correctly installed")
    
    t.ok(TestClass.my.res == 'class', "Symbiont's attribute was correctly installed")
    t.is(TestClass.my.result(), 'TestClass:class', "Symbiont's method was correctly installed")
    
    
    //==================================================================================================================================================================================
    t.diag("Role with symbiont creation")
    
    Role('Walk', { 
        my : {
            have : {
                walking : false
            },
            
            methods : {
                walk : function (where) { this.walking = true },
                stop : function () { this.walking = false }
            }
        }
    })
    
    t.ok(Walk.my.hasAttribute('walking') && Walk.my.getAttribute('walking').value == false, 'Walk has correct attribute walking')
    t.ok(Walk.my.hasMethod('walk'), 'Walk has method walk')
    t.ok(Walk.my.hasMethod('stop'), 'Walk has method stop')


    //==================================================================================================================================================================================
    t.diag("Role with symbiont applying")
    
    TestClass.meta.extend({ 
        does : [ Walk ]
    })
    
    t.ok(TestClass.my.meta.hasAttribute('walking'), "TestClass.my has 'walking' attribute"); 
    t.ok(TestClass.my.meta.hasMethod('walk'), "TestClass.my has 'walk' method")
    
    
    TestClass.my.walk('there')
    t.ok(TestClass.my.walking, 'TestClass is walking')
    TestClass.my.stop()
    t.ok(!TestClass.my.walking, 'TestClass is not walking')
        
    //==================================================================================================================================================================================
    t.diag("Symbiont inheritance")
    
    Class('SubTestClass', {
    	isa : TestClass,
    	
    	my : {
    		
    		after : {
    			initialize : function () { this.res = 'SubTestClass:res' }
    		},
    		
            methods : {
                result : function() { return 'SubTestClass:class' }
            }
    	}
    })
    
    t.ok(SubTestClass.my.meta.hasAttribute('res'), "SubTestClass.my has 'res' attribute"); 
    t.ok(SubTestClass.my.meta.hasMethod('result'), "SubTestClass.my has 'result' method")
    t.is(SubTestClass.my.res, 'SubTestClass:res', "Symbiont's 'after' modifier was executed")
    t.is(SubTestClass.my.result(), 'SubTestClass:class', "Symbiont's method was correctly overriden")
    
})