(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(54)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;
    self.ok(Joose.Kernel.ProtoModule, "The Joose.Kernel.ProtoModule class is here")
    self.ok(Joose.Kernel.ProtoModule, "The Joose.Kernel.ProtoModule class is here")
    
    self.ok(__global__, "There is a global module")
    self.ok(__global__.meta.meta.isa(Joose.Kernel.ProtoModule), "And it is a Joose.Kernel.ProtoModule")
    
    Module("Com.test.module", {
	    body : function () {
	        Class("Test1", {
	            methods: { world: function () { return "hello" } }
	        });
	        Class("Test2", {
	            methods: { world: function () { return "hello" } }
	        })
	    }
    });
    
    self.ok(Com, "There is something in the Com spot")
    self.ok(Com.meta, "And is has a meta object")
    self.ok(Com.meta.meta, "And a meta meta object")
    self.ok(Com.meta.meta.isa(Joose.Kernel.ProtoModule), "And it is a Joose.Kernel.ProtoModule")
    self.ok(Com.meta.getName() == "Com", "The name is correct")
    
    self.throws_ok(
    	function () { new Com() }, 
        "Modules may not be instantiated.",
        "Not filled Modules can't be instantiated"
	)

    self.ok(Com.test.module, "There is something in the module spot")
    self.ok(Com.test.module.meta.meta.isa(Joose.Kernel.ProtoModule), "And it is a Joose.Kernel.ProtoModule")
    self.ok(Com.test.module.meta.getName() == "Com.test.module", "The name is correct")

    self.throws_ok(
    	function () { new Com.test.module() }, 
        "Modules may not be instantiated.",
        "Not filled Modules can't be instantiated #2"
	)
    
    
    self.ok(Com.test.module.Test1, "There is also something in the class spot")
    self.ok(Com.test.module.Test1.meta, "and it has a meta object")
    self.ok(Com.test.module.Test1.meta.meta.isa(Joose.Class), "it is a class")
    
    self.ok(Com.test.module.Test2, "There is also something in the class spot")
    self.ok(Com.test.module.Test2.meta, "and it has a meta object")
    self.ok(Com.test.module.Test2.meta.meta.isa(Joose.Class), "it is a class")
    
    self.ok(Com.test.module.Test1.meta.className()  == "Com.test.module.Test1", "The class name is correct")
    self.ok(Com.test.module.Test2.meta.className() == "Com.test.module.Test2", "The class name is correct")
    

    var testFunc = function(){};
    testFunc.toString = function () { return 'testFunc'};
    
    //==================================================================================================================================================================================
    self.diag("Aliasing")
    
    self.ok(Com.test.module.meta.alias, "There is an alias method");
    Com.test.module.meta.alias(thistop)
    self.ok(thistop.Test1, "There is something in the expected spot")
    self.ok(thistop.Test1 === Com.test.module.Test1, "Class is now global")
    
    var o = new thistop.Test1();
    self.ok(o, "We can instantiate class")
    self.ok(o.world() == "hello", "and call methods on them")
    
    self.ok(new Com.test.module.Test1(), "We can also instantiate the fully qualified name");
    self.ok(new Com.test.module.Test1().world() == "hello", "and call methods on them");
    
    self.lives_ok(function () {Com.test.module.meta.alias(thistop)}, "We can import again")
    self.ok(new thistop.Test1().world() == "hello", "and call methods")
   
    thistop.Test1 = testFunc;
    self.throws_ok(function () {Com.test.module.meta.alias(thistop)},
        "Aliasing of Com.test.module to ",//[object Window] failed, there is already something: testFunc",
    
//        "Adding namespace element failed: namespace element [Test1] already exists",
        "Importing fails if there is already something different")

        
//    debugger;
    Module("Com.test", function () {
        Class("Test1", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(Com.test.Test1, "we can make modules on a lower hierarchy")
    self.ok(new Com.test.Test1(), "we can instantiate modules on a lower hierarchy")
    
    Module("Com.test", function () {
        Class("Test2", {
            methods: { two: function () { return 2 } }
        })
    })
    
    self.ok((new Com.test.Test1()).one() == 1, "We can declare modules multiple times. The formerly declared class is still there")
    self.ok((new Com.test.Test2()).two() == 2, "We can make modules on a lower hierarchy. The new class is here.")

    Com.test.userProperty = 'direct';
    
    Module("Com", function () {
        Class("test", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new Com.test().one() == 1, "We can declare classes on the place of empty module")
    self.ok(Com.test.Test1 && Com.test.Test2, "Further classes in namespace chain are kept untouched")
    self.ok(Com.test.userProperty == 'direct', "Hidden (directly added) properties are kept untouched")
    self.ok((new Com.test.Test1()).one() == 1 && (new Com.test.Test2()).two() == 2, "Further classes in namespace chain are kept untouched #2")
    
    //==================================================================================================================================================================================
    self.diag("Collisions between class methods and namespace elements")
    
    self.throws_ok(
    	function () { Com.test.meta.addClassMethod('Test1', testFunc) }, 
        "Collision between existing namespace element [Com.test.Test1] and a new classMethod [Test1]",
        "Collision between namespace element and classmethod is detecting"
	)
	
	
	Com.test.meta.addClassMethod('classMethod', testFunc);
    self.throws_ok(
    	function () { 
    		Class('Com.test.classMethod', {}); 
    	}, 
        "Trying to setup module Com.test.classMethod failed. There is already something: testFunc",
        "Collision between classmethod and namespace element is detecting"
	)
    
    //==================================================================================================================================================================================
    self.diag("Class usage in Module context")
    
    Module("Joose.SimpleRequest", function () {
        Class("FooBar", {})
    })
    self.ok(Joose.SimpleRequest.FooBar, "We can put a module in a used spot")
    
    
    Module("Com.test.module", function (m) {
        self.ok(new m.Test1().world() == "hello", "Module passes the current module to the module creation function")
        self.ok(new this.Test1().world() == "hello", "Module execute its body in the current module scope")
    })
    
    
    self.throws_ok(function () {
        Module("Com.test.meta.bla", function () {
            
        })
    }, "Module names may not include a part called 'meta'.", "meta is not allowed in a module name")
    
    
    //==================================================================================================================================================================================
    self.diag("Basic nesting modules")
    
    Module("Com.test", function () {
        Module("Nested", function () {
            Class("NestTesting", {
            	methods : {
            		three : function () { return 3 }
            	}
            })
        });
        
        
        Module("Nested.Copy", function () {
            Class("NestTesting", {
            	methods : {
            		four : function () { return 4 }
            	}
            })
        });
    })
    
    self.ok(Com.test.Nested, "Something in the nested module spot");
    self.ok(Com.test.Nested.meta.meta.isa(Joose.Kernel.ProtoModule), "And its a Joose.Kernel.ProtoModule");
    self.ok(Com.test.Nested.NestTesting, "Something in the nested class spot");
    self.ok(new Com.test.Nested.NestTesting().three() == 3, "And its a correct class");

    self.ok(Com.test.Nested.Copy, "Something in the nested module spot #2");
    self.ok(Com.test.Nested.Copy.meta.meta.isa(Joose.Kernel.ProtoModule), "And its a Joose.Kernel.ProtoModule");
    self.ok(Com.test.Nested.Copy.NestTesting, "Something in the nested class spot #2");
    self.ok(new Com.test.Nested.Copy.NestTesting().four() == 4, "And its a correct class #2");
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
