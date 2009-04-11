(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Advanced attributes");
    
    this.ok(Joose.Attribute, "Joose.Attribute is here");
    
    
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
    
    this.ok(advAttr instanceof Joose.Attribute, "'res' attribute is a Joose.Attribute instance");
    
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
     
    this.throws_ok(function(){
		var testClass2 = new TestClass();
    }, "Required attribute [required] is missed during initialization of a TestClass", "required attribute should be specified");

    var testClass2 = new TestClass({
		simple : 'foo1',
		required : 'bar1'
	});
	
	this.ok(typeof testClass2.func == 'object', "'func' attribute initialized #2");
	this.ok(testClass2.func != testClass1.func, "'init' creates different instances for each call");
        
};

return testobj;
})()