(function () {
var testobj = new Test.TAP.Class();
testobj.plan(8)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Advanced Role application");
    
    //==================================================================================================================================================================================
    this.diag("Overriding methods/attributes from superclass");
    
    Class('SuperClass', {
    	have : {
    		res : 'sup:res'
    	},
    	
    	methods : {
    		process : function () { return 'sup:process' }
    	}
    });
    this.ok(SuperClass, 'SuperClass class was created');

    
    Class('SubClass', {
    	isa : SuperClass
    });
    this.ok(SubClass, 'SuperClass class was created');
    
    this.ok(SubClass.meta.hasAttribute('res') && SubClass.meta.getAttribute('res').value == 'sup:res', "SubClass has correct attribute 'res'");
    this.ok(SubClass.meta.hasMethod('process') && new SubClass().process() == 'sup:process', "SubClass has method 'process'");
    
    
    Role('Resource', {
    	have : {
    		res : 'role:res'
    	},
    	
    	methods : {
    		process : function () { return 'role:process' }
    	}
    });
    this.ok(Resource, 'Resource role was created');
    
    SubClass.meta.extend({
    	does : [ Resource ]
    })
    
    this.ok(SubClass.meta.hasAttribute('res') && SubClass.meta.getAttribute('res').value == 'role:res', "SubClass has correct attribute 'res'");
    this.ok(SubClass.meta.hasMethod('process') && new SubClass().process() == 'role:process', "SubClass has method 'process'");

    
    //==================================================================================================================================================================================
    this.diag("Composition of the same Role on different hierarchy levels");
    
    Role('PostProcess', {
    	after : {
    		process : function () {
    			this.res += '|afterFromRole'
    		}
    	}
    });
    
    
    Class('SuperClass1', {
    	does : [ PostProcess ],
    	
    	have : {
    		res : 'sup1:res'
    	},
    	
    	methods : {
    		process : function () { 
    			this.res += '|afterSup1' 
			}
    	}
    });
    
    
    Class('SubClass1', {
    	isa : SuperClass1,
    	
    	does : [ PostProcess ],
    	
    	methods : {
    		process : function () { 
    			this.SUPER();
    			this.res += '|afterSub1' 
			}
    	}
    });
    
    Class('SubClass2', {
    	isa : SubClass1,
    	
    	does : [ PostProcess ],
    	
    	methods : {
    		process : function () { 
    			this.SUPER();
    			this.res += '|afterSub2' 
			}
    	}
    });
    
    var sub2 = new SubClass2();
    sub2.process();
    this.diag(sub2.res);
    this.ok(sub2.res == 'sup1:res|afterSup1|afterFromRole|afterSub1|afterFromRole|afterSub2|afterFromRole', "'PostProcess' role was applied on all inheritance levels");
    
};

return testobj;
})()