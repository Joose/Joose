(function () {
var t = new Test.TAP.Class();
t.plan(1)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;

    //==================================================================================================================================================================================
    this.diag("Modules");
    
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
    self.ok(TestModule.meta instanceof Joose.Namespace.Keeper, '.. and its a Joose.Namespace.Keeper');
    
    self.ok(TestModule.meta.ns.container == TestModule, 'Container of namespace is a module function');
	self.is(TestModule.foo, 'bar', 'Body of module was executed in the scope of its container');
	self.is(TestModule.bar, 'baz', 'Module namespacekeeper was also passed as 1st argument to body');
    
    self.throws_ok(
        function () { new TestModule() }, 
        "Modules may not be instantiated.",
        "Not filled Modules can't be instantiated"
    );
    
    
    //==================================================================================================================================================================================
    this.diag("Basic nesting");
    
    Module("TestModule", {
        body : function () {
            Class("Test1", {
                methods: { world: function () { return "hello1" } }
            });
            Class("Test2", {
                methods: { world: function () { return "hello2" } }
            })
        }
    });
    
    
    self.ok(TestModule.Test1, "There is something in the class spot")
    self.ok(TestModule.Test1.meta instanceof Joose.MetaClass, "it is a class")
    self.ok(TestModule.Test1.meta.name  == "TestModule.Test1", "The class name is correct")
    self.ok(new TestModule.Test1().world() == 'hello1', "Class was correctly instantiated");
    
    self.ok(TestModule.Test2, "There is something in the class#2 spot")
    self.ok(TestModule.Test2.meta instanceof Joose.MetaClass, "it is a class")
    self.ok(TestModule.Test2.meta.name  == "TestModule.Test2", "The class name is correct")
    self.ok(new TestModule.Test2().world() == 'hello2', "Class was correctly instantiated");
    
    
    
    
    
//    var testFunc = function(){};
//    testFunc.toString = function () { return 'testFunc'};
//    
//    //==================================================================================================================================================================================
//    self.diag("Aliasing")
//    
//    self.ok(Com.test.module.meta.alias, "There is an alias method");
//    Com.test.module.meta.alias(thistop)
//    self.ok(thistop.Test1, "There is something in the expected spot")
//    self.ok(thistop.Test1 === Com.test.module.Test1, "Class is now global")
//    
//    var o = new thistop.Test1();
//    self.ok(o, "We can instantiate class")
//    self.ok(o.world() == "hello", "and call methods on them")
//    
//    self.ok(new Com.test.module.Test1(), "We can also instantiate the fully qualified name");
//    self.ok(new Com.test.module.Test1().world() == "hello", "and call methods on them");
//    
//    self.lives_ok(function () {Com.test.module.meta.alias(thistop)}, "We can import again")
//    self.ok(new thistop.Test1().world() == "hello", "and call methods")
//   
//    thistop.Test1 = testFunc;
//    self.throws_ok(function () {Com.test.module.meta.alias(thistop)},
//        "Aliasing of Com.test.module to ",//[object Window] failed, there is already something: testFunc",
//    
////        "Adding namespace element failed: namespace element [Test1] already exists",
//        "Importing fails if there is already something different")
//
//        
////    debugger;
//    Module("Com.test", function () {
//        Class("Test1", {
//            methods: { one: function () { return 1 } }
//        })
//    })
//    
//    self.ok(Com.test.Test1, "we can make modules on a lower hierarchy")
//    self.ok(new Com.test.Test1(), "we can instantiate modules on a lower hierarchy")
//    
//    Module("Com.test", function () {
//        Class("Test2", {
//            methods: { two: function () { return 2 } }
//        })
//    })
//    
//    self.ok((new Com.test.Test1()).one() == 1, "We can declare modules multiple times. The formerly declared class is still there")
//    self.ok((new Com.test.Test2()).two() == 2, "We can make modules on a lower hierarchy. The new class is here.")
//
//    Com.test.userProperty = 'direct';
//    
//    Module("Com", function () {
//        Class("test", {
//            methods: { one: function () { return 1 } }
//        })
//    })
//    
//    self.ok(new Com.test().one() == 1, "We can declare classes on the place of empty module")
//    self.ok(Com.test.Test1 && Com.test.Test2, "Further classes in namespace chain are kept untouched")
//    self.ok(Com.test.userProperty == 'direct', "Hidden (directly added) properties are kept untouched")
//    self.ok((new Com.test.Test1()).one() == 1 && (new Com.test.Test2()).two() == 2, "Further classes in namespace chain are kept untouched #2")
//    
//    //==================================================================================================================================================================================
//    self.diag("Collisions between class methods and namespace elements")
//    
//    self.throws_ok(
//        function () { Com.test.meta.addClassMethod('Test1', testFunc) }, 
//        "Collision between existing namespace element [Com.test.Test1] and a new classMethod [Test1]",
//        "Collision between namespace element and classmethod is detecting"
//    )
//    
//    
//    Com.test.meta.addClassMethod('classMethod', testFunc);
//    self.throws_ok(
//        function () { 
//            Class('Com.test.classMethod', {}); 
//        }, 
//        "Trying to setup module Com.test.classMethod failed. There is already something: testFunc",
//        "Collision between classmethod and namespace element is detecting"
//    )
//    
//    //==================================================================================================================================================================================
//    self.diag("Class usage in Module context")
//    
//    Module("Joose.SimpleRequest", function () {
//        Class("FooBar", {})
//    })
//    self.ok(Joose.SimpleRequest.FooBar, "We can put a module in a used spot")
//    
//    
//    Module("Com.test.module", function (m) {
//        self.ok(new m.Test1().world() == "hello", "Module passes the current module to the module creation function")
//        self.ok(new this.Test1().world() == "hello", "Module execute its body in the current module scope")
//    })
//    
//    
//    self.throws_ok(function () {
//        Module("Com.test.meta.bla", function () {
//            
//        })
//    }, "Module names may not include a part called 'meta'.", "meta is not allowed in a module name")
//    
//    
//    //==================================================================================================================================================================================
//    self.diag("Basic nesting modules")
//    
//    Module("Com.test", function () {
//        Module("Nested", function () {
//            Class("NestTesting", {
//                methods : {
//                    three : function () { return 3 }
//                }
//            })
//        });
//        
//        
//        Module("Nested.Copy", function () {
//            Class("NestTesting", {
//                methods : {
//                    four : function () { return 4 }
//                }
//            })
//        });
//    })
//    
//    self.ok(Com.test.Nested, "Something in the nested module spot");
//    self.ok(Com.test.Nested.meta.meta.isa(Joose.Kernel.ProtoModule), "And its a Joose.Kernel.ProtoModule");
//    self.ok(Com.test.Nested.NestTesting, "Something in the nested class spot");
//    self.ok(new Com.test.Nested.NestTesting().three() == 3, "And its a correct class");
//
//    self.ok(Com.test.Nested.Copy, "Something in the nested module spot #2");
//    self.ok(Com.test.Nested.Copy.meta.meta.isa(Joose.Kernel.ProtoModule), "And its a Joose.Kernel.ProtoModule");
//    self.ok(Com.test.Nested.Copy.NestTesting, "Something in the nested class spot #2");
//    self.ok(new Com.test.Nested.Copy.NestTesting().four() == 4, "And its a correct class #2");
}

return t;
})()