(function() {
var t = new Test.TAP.Class();
t.plan(34)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;
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
    
    self.ok(Com.test.module.meta.alias, "There is an alias method");
    Com.test.module.meta.alias(__global__)
    self.ok(thistop.Test1, "There is something in the expected spot")
    self.ok(thistop.Test1 === Com.test.module.Test1, "Class is now global")
    
    self.ok(new thistop.Test1(), "We can instantiate class")
    var o = new thistop.Test1();
    self.ok(o.world() == "hello", "and call methods on them")
    
    self.ok(new Com.test.module.Test1(), "We can also instantiate the fully qualified name");
    self.ok(new Com.test.module.Test1().world() == "hello", "and call methods on them");
    
    self.lives_ok(function () {Com.test.module.meta.alias(__global__)}, "We can import again")
    self.ok(new thistop.Test1().world() == "hello", "and call methods")
   
    thistop.Test1 = function() {};
    self.throws_ok(function () {Com.test.module.meta.alias(__global__)}, 
        "Adding namespace element failed: namespace element [Test1] already exists",
        "Importing fails if there is already something else")

        
    Module("Com.test", function () {
        Class("Test1", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(Com.test.Test1, "we can make modules on a lower hierarchy")
    self.ok(new Com.test.Test1(), "we can instantiate modules on a lower hierarchy")
    
    Module("Com.test", function () {
        Class("Test2", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new Com.test.Test1(), "We can declare modules multiple times. The formerly declared class is still there")
    self.ok(new Com.test.Test2(), "we can make modules on a lower hierarchy. The new class is here.")

    
    Module("Com", function () {
        Class("test", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new Com.test().one() == 1, "We can declare classes on the place of empty module")

    
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
}

return t;
})()
