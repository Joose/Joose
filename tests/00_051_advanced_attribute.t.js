(function () {
var testobj = new Test.TAP.Class();
testobj.plan(26)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Advanced attributes");
    
    this.ok(Joose.Kernel.Attribute, "Joose.Kernel.Attribute is here");
    
    
    //==================================================================================================================================================================================
    this.diag("Class with advanced attribute");
    
    Class('TestClass', {
        has : {
            res : {
            	is : 'rw',
            	init : 'advanced'
            }
        }
    });
    
    this.ok(TestClass.meta instanceof Joose.MetaClass, "TestClass successfully created");
    this.ok(TestClass.meta.hasAttribute('res'), "'res' attribute was added");
    
    var advAttr = TestClass.meta.getAttribute('res');
    
    this.ok(advAttr instanceof Joose.Kernel.Attribute, "'res' attribute is a Joose.Kernel.Attribute instance");
    
    this.ok(advAttr.value == 'advanced' && TestClass.prototype.res == 'advanced', "Attribute has a correct initial value");
    this.ok(advAttr.role.meta.hasMethod('getRes'), "Attribute's role has getter");
    this.ok(advAttr.role.meta.hasMethod('setRes'), "Attribute's role has setter");
    
    this.ok(TestClass.meta.hasMethod('getRes'), "Getter method was added");
    this.ok(TestClass.meta.hasMethod('setRes'), "Setter method was added");
    
    
    var testClass = new TestClass();
    
    this.ok(testClass.res == 'advanced' && testClass.getRes() == 'advanced', "Getter works #1");
    
    testClass.setRes('setter');
    this.ok(testClass.res == 'setter' && testClass.getRes() == 'setter', "Setter & Getter works");
    
    
    //==================================================================================================================================================================================
    this.diag("Mutability & Custom accessors");
    
    TestClass.meta.extend({ 
        methods : {
        	
            setRes : function(value) {
            	this.res = 'mutable:' + value;
            },
            
            getRes : function(value) {
            	return 'getRes';
            }
        }
    });
    
    testClass.setRes('mutable');
    this.ok(testClass.res == 'mutable:mutable' && testClass.getRes() == 'getRes', "Custom Setter & Getter works");
    
    TestClass.meta.extend({ 
        removeMethods : [ 'setRes', 'getRes' ]
    });
    
    
    testClass.setRes('mutable');
    this.ok(testClass.res == 'mutable' && testClass.getRes() == 'mutable', "Setter & Getter from attribute in effect again");
    

    //==================================================================================================================================================================================
    this.diag("Attributes initialization");
    
    TestClass.meta.extend({ 
        has : {
        	simple : { init : 'simple' },
        	
        	required : { required : true },
        	
        	func : {
        		init : function () { return {} }
        	}
        }
    });
    
	var testClass1 = new TestClass({
		simple : 'foo',
		required : 'bar'
	});
	
	this.ok(testClass1.simple == 'foo', "'simple' attribute initialized");
    this.ok(testClass1.required == 'bar', "'required' attribute initialized");
    this.ok(typeof testClass1.func == 'object', "'func' attribute initialized");
    
    
    //==================================================================================================================================================================================
    this.diag("Exception on 'required'");
    
    
    this.throws_ok(function(){
		var testClass2 = new TestClass();
    }, "Required attribute [required] is missed during initialization of a TestClass", "required attribute should be specified");

    var testClass2 = new TestClass({
		simple : 'foo1',
		required : 'bar1'
	});
	
	this.ok(typeof testClass2.func == 'object', "'func' attribute initialized #2");
	this.ok(testClass2.func != testClass1.func, "'init' creates different instances for each call");
	
	
    //==================================================================================================================================================================================
    this.diag("Trigger testing");
	
    this.ok(Joose.Attribute.Trigger, "Joose.Attribute.Trigger is here");
    
    TestClass.meta.extend({ 
        has : {
        	trigger : {
        		init : 'foo',
        		
        		trigger : function (value) {
        			this.setRes('triggered'); 
        		} 
    		}
        }
    });
    
    var testClass3 = new TestClass({
    	required : null,
		trigger : 'bar'
	});
	
    this.ok(testClass3.trigger == 'bar', "Value of 'trigger' attribute is correct");
    this.ok(testClass3.res == 'triggered', ".. and the trigger function was executed");
    

    //==================================================================================================================================================================================
    this.diag("Lazy testing");
    
    TestClass.meta.extend({ 
        has : {
        	lazy1 : {
        		lazy : function () { return 'lazy1-value' } 
    		},
    		
    		lazy2 : {
    			init : function () { return 'lazy2-value' },
    			lazy : true
    		}
        }
    });
    
    var testClass4 = new TestClass({
    	required : null
	});
	
    this.ok(testClass4.lazy1 == undefined, "Value of 'lazy1' attribute is not initialized yet");
    this.ok(testClass4.lazy2 == undefined, "Value of 'lazy2' attribute is not initialized yet");
    
    this.ok(testClass4.getLazy1() == 'lazy1-value' && testClass4.lazy1 == 'lazy1-value', "Value of 'lazy1' was setuped during 1st getter call");
    this.ok(testClass4.getLazy2() == 'lazy2-value' && testClass4.lazy2 == 'lazy2-value', "Value of 'lazy2' was setuped during 1st getter call");
};

return testobj;
})()