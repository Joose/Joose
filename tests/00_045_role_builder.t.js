(function () {
var testobj = new Test.TAP.Class();
testobj.plan(12)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Builder in the Role");
    
    this.ok(Joose.MetaRole, "Joose.MetaRole is here");
    this.ok(Joose.MetaClass, "Joose.MetaClass is here");
    
    this.ok(Joose.MetaRole.meta.hasAttribute('builderRole'), "Joose.MetaRole has 'builderRole' attribute");
    this.ok(Joose.MetaRole.meta.hasAttribute('stemRole'), "Joose.MetaRole has 'builderRole' attribute");
    
    
    //==================================================================================================================================================================================
    this.diag("Creation Role with builder");
    
    var RoleWithBuilder = new Joose.MetaRole('RoleWithBuilder', {
        builder : {
        	methods : {
	            testHandler : function(meta, props){
	                var name = props.name;
	                var value = props.value;
	                
	                meta.addMethod(name, function(){
	                    return value;
	                });
	            }
        	}
        }
    }).c;
    
    this.ok(typeof RoleWithBuilder == 'function', "RoleWithBuilder was created");
    
    this.ok(RoleWithBuilder.meta.builderRole, "RoleWithBuilder has 'builderRole'");
    this.ok(RoleWithBuilder.meta.builderRole.meta instanceof Joose.Managed.Role, ".. and its a Joose.Managed.Role");
    
    this.ok(RoleWithBuilder.meta.builderRole.meta.hasMethod('testHandler'), "builderRole has 'testHandler' method"); 
    
    
    //==================================================================================================================================================================================
    this.diag("Extending of builder");
    
    var TestMetaClass = new Joose.MetaClass('TestClass1', {
        isa : Joose.MetaClass
    }).c;
    
    TestMetaClass.meta.extend({
    	does : [ RoleWithBuilder ]
    });
    
    var TestClass1 = new TestMetaClass('TestClass1', {
        
        testHandler : {
            name : 'result',
            value : 'TestClass1'
        }
        
    }).c;
    
    var testClass1 = new TestClass1();
    
    this.ok(TestClass1.meta.builder.meta.hasMethod('testHandler'), "Builder has new handler");
    this.ok(TestClass1.meta.hasOwnMethod('result') && testClass1.result() == 'TestClass1', "Builder was extened and works correctly");

    
    //==================================================================================================================================================================================
    this.diag("Mutability");
    
    RoleWithBuilder.meta.extend({
        builder : {
        	methods : {
	            testHandler1 : function(meta, props){
	                var name = props.name1;
	                var value = props.value1;
	                
	                meta.addMethod(name, function(){
	                    return value;
	                });
	            }
        	}
        }
    });
    
    this.ok(TestClass1.meta.builder.meta.hasMethod('testHandler1'), "Builder received new handler via mutability");
    
    TestClass1.meta.extend({
        testHandler1 : {
            name1 : 'result1',
            value1 : 'TestClass11'
        }
    });
    
    this.ok(TestClass1.meta.hasOwnMethod('result1') && testClass1.result1() == 'TestClass11', "Builder was extened and works correctly");
    
    
};

return testobj;
})()