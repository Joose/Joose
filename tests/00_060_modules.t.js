(function () {
var t = new Test.TAP.Class();
t.plan(1)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    //==================================================================================================================================================================================
    self.diag("Modules");
    
    self.ok(Joose.Namespace.Manager, "Joose.Namespace.Manager is here");
    self.ok(Joose.Namespace.Keeper, "Joose.Namespace.Keeper is here");
    
    self.ok(__global__, "There is a global module")
    self.ok(__global__ instanceof Joose.Managed.PropertySet.Namespace, "And it is a link to an Joose.Managed.PropertySet.Namespace instance")
    self.ok(__global__.container == Joose.top, "Container of global module is a top scope")
    
    Module('TestModule', {
    	body : function(module) {
    		this.foo = 'bar';
    		module.bar = 'baz';
    	}
    });
    
    self.ok(TestModule, 'Something in the module spot appears');
    self.ok(TestModule.meta.constructor == Joose.Namespace.Keeper, '.. and its a Joose.Namespace.Keeper');
    
    self.ok(TestModule.meta.ns.container == TestModule, 'Container of namespace is a module function');
	self.is(TestModule.foo, 'bar', 'Body of module was executed in the scope of its container');
	self.is(TestModule.bar, 'baz', 'Module namespacekeeper was also passed as 1st argument to body');
    

    //==================================================================================================================================================================================
    self.diag("Exceptions");

    self.throws_ok(
        function () { new TestModule() }, 
        "Modules may not be instantiated.",
        "Not filled Modules can't be instantiated"
    );
    
    self.throws_ok(function () {
        Module("Testy.meta.bla", function () {
            
        })
    }, "Module name [Testy.meta.bla] may not include a part called 'meta' or 'my' or empty part.", "meta is not allowed in a module name")
    

    self.throws_ok(function () {
        Module("Testy..bla", function () {
            
        })
    }, "Module name [Testy..bla] may not include a part called 'meta' or 'my' or empty part.", "meta is not allowed in a module name")
    

    self.throws_ok(function () {
        Module("Testy.my.bla", function () {
            
        })
    }, "Module name [Testy.my.bla] may not include a part called 'meta' or 'my' or empty part.", "meta is not allowed in a module name")
    
    
    //==================================================================================================================================================================================
    self.diag("Basic nesting");
    
    Module("TestModule", {
        body : function () {
            Class("Test1", {
                methods: { world: function () { return "hello1" } }
            });
            
            Class("Test2", {
                methods: { world: function () { return "hello2" } }
            });
            
            Module("Test3", function(mod){
            	this.foo = 'bar';
            	mod.bar = 'baz';
            });
        }
    });
    
    
    self.ok(TestModule.Test1, "There is something in the class spot")
    self.ok(TestModule.Test1.meta.constructor == Joose.MetaClass, "it is a class")
    self.ok(TestModule.Test1.meta.name  == "TestModule.Test1", "The class name is correct")
    self.ok(new TestModule.Test1().world() == 'hello1', "Class was correctly instantiated");
    
    self.ok(TestModule.Test2, "There is something in the class#2 spot")
    self.ok(TestModule.Test2.meta.constructor == Joose.MetaClass, "it is a class")
    self.ok(TestModule.Test2.meta.name  == "TestModule.Test2", "The class name is correct")
    self.ok(new TestModule.Test2().world() == 'hello2', "Class was correctly instantiated");
    
    self.ok(TestModule.Test3, 'Something in the nested module spot appears');
    self.ok(TestModule.Test3.meta.constructor == Joose.Namespace.Keeper, '.. and its a Joose.Namespace.Keeper');
    self.ok(TestModule.Test3.foo == 'bar' && TestModule.Test3.bar == 'baz', 'TestModule.Test3 was correctly setuped');
    
    
    //==================================================================================================================================================================================
    self.diag("Modules redeclaration");
    
	self.ok(TestModule.foo == 'bar' && TestModule.bar == 'baz', 'TestModule is still the same after extension');
	
	Module("TestModule.Test3", {
        body : function () {
            Module("Test4");
        }
    });
    
    self.ok(TestModule.Test3.Test4, 'Something in the nested module spot appears');
    self.ok(TestModule.Test3.Test4.meta.constructor == Joose.Namespace.Keeper, '.. and its a Joose.Namespace.Keeper');
    self.ok(TestModule.Test3.foo == 'bar' && TestModule.Test3.bar == 'baz', "TestModule.Test3 hasn't changed");

    
    //==================================================================================================================================================================================
    self.diag("Promotion of Module to Class");
    
    Class("TestModule.Test3", {
        have : {
        	one : 1
        },
        
        methods: { 
        	two: function () { return 2 } 
    	}
    });
    
    self.ok(TestModule.Test3.meta.constructor == Joose.MetaClass, 'Module was promoted to class');
    
    var test3 = new TestModule.Test3();
    
    self.ok(test3.one == 1 && test3.two() == 2, 'Class was constructed correctly');
    self.ok(TestModule.Test3.foo == 'bar' && TestModule.Test3.bar == 'baz', "and TestModule.Test3 function itself hasn't changed");
    
    
    //==================================================================================================================================================================================
    self.diag("Class usage in Module context")
    
    Class("TestModule.Test3.FooBar", {
	        have : {
	        	one : 1
	        },
	        
	        methods: { 
	        	two: function () { return 2 } 
	    	}
    })
    
    self.ok(TestModule.Test3.FooBar, "We can use a class as Module")
    self.ok(TestModule.Test3.FooBar.meta.constructor == Joose.MetaClass, "it is a class")
    
    var foobar = new TestModule.Test3.FooBar();
    
    self.ok(foobar.one == 1 && foobar.two() == 2, 'Class was constructed correctly');
    
    
    //==================================================================================================================================================================================
    self.diag("More basic nesting")
    
    Module("Testy", function () {
        Module("Nested", function () {
            Class("Testing", {
                methods : {
                    three : function () { return 3 }
                }
            })
        });
        
        
        Module("Nested.Copy", function () {
            Class("Testing", {
                methods : {
                    four : function () { return 4 }
                }
            })
        });
    })
    
    self.ok(Testy && Testy.meta.constructor == Joose.Namespace.Keeper, "Module 'Testy' was created");
    self.ok(Testy.Nested && Testy.Nested.meta.constructor == Joose.Namespace.Keeper, "Module 'Testy.Nested' was created");
    self.ok(Testy.Nested.Copy && Testy.Nested.Copy.meta.constructor == Joose.Namespace.Keeper, "Module 'Testy.Nested.Copy' was created");
    
    self.ok(Testy.Nested.Testing && Testy.Nested.Testing.meta.constructor == Joose.MetaClass, "Class 'Testy.Nested.Testing' was created");
    self.ok(Testy.Nested.Copy.Testing && Testy.Nested.Copy.Testing.meta.constructor == Joose.MetaClass, "Class 'Testy.Nested.Copy.Testing' was created");
    
    self.ok(new Testy.Nested.Testing().three() == 3, "Class 'Testy.Nested.Testing' was constructed correctly");
    self.ok(new Testy.Nested.Copy.Testing().four() == 4, "Class 'Testy.Nested.Copy.Testing' was constructed correctly");
}

return t;
})()