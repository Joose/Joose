(function () {
var testobj = new Test.TAP.Class();
testobj.plan(12)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Lazy meta");
    
    this.ok(JooseX.Meta.Lazy, "JooseX.Meta.Lazy is here");
    

    //==================================================================================================================================================================================
    this.diag("Defining lazy metaclasses");
    
    Class('TestMetaClass', {
    	meta : Joose.Meta.Class,
    	
    	isa : Joose.Meta.Class,
    	
    	does : [ JooseX.Meta.Lazy ]
    });
    

    Class('TestMetaRole', {
    	meta : Joose.Meta.Class,
    	
    	isa : Joose.Meta.Role,
    	
    	does : [ JooseX.Meta.Lazy ]
    });
    

    //==================================================================================================================================================================================
    this.diag("Creation");
    
    Class('SuperClass', {
    	meta : TestMetaClass,
    	
    	have : {
    		res : 'sup:res'
    	},
    	
    	methods : {
    		process : function () { return 'sup:process' }
    	}
    });
    this.ok(SuperClass, 'SuperClass class was created');

    
    Role('Resource', {
    	meta : TestMetaRole,
    	
    	have : {
    		res : 'role:res'
    	},
    	
    	methods : {
    		process : function () { return 'role:process' }
    	}
    });
    this.ok(Resource, "Role 'Resource' was created");

    
    Class('SubClass', {
    	isa : SuperClass,
    	
    	does : [ Resource ]
    });
    this.ok(SubClass, 'SubClass class was created');

    

    //==================================================================================================================================================================================
    this.diag("Under construction state");
    
    this.ok(!SuperClass.meta.hasAttribute('res'), "SuperClass has no 'res' yet - underConstruction");
    this.ok(!SuperClass.meta.hasMethod('process'), "SubClass has no method 'process' yet - underConstruction");
    
    this.ok(!Resource.meta.hasAttribute('res'), "Resource has no 'res' yet - underConstruction");
    this.ok(!Resource.meta.hasMethod('process'), "Resource has no method 'process' yet - underConstruction");

    
    //==================================================================================================================================================================================
    this.diag("Lazy construction");
    
    var subclass = new SubClass();
    
    this.ok(SuperClass.meta.hasAttribute('res') && SuperClass.meta.hasMethod('process'), "SuperClass was correctly constructed");
    this.ok(Resource.meta.hasAttribute('res') && Resource.meta.hasMethod('process'), "Resource was correctly constructed");
    
    this.ok(SubClass.meta.hasAttribute('res') && subclass.res == 'role:res', "SubClass was correctly constructed #1");
    this.ok(SubClass.meta.hasMethod('process') && subclass.process() == 'role:process', "SubClass was correctly constructed #2");
};

return testobj;
})()