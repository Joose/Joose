(function() {
var t = new Test.TAP.Class();
t.plan(34)

var thistop = Test.prototype.top()

t.testModuleClass = function() {
    var self = this;
    self.ok(Joose.Module, "The module class is here")
    
//    Module("Com.test.module", function () {
//        Class("Test1", {
//            methods: { world: function () { return "hello" } }
//        });
//        Class("Test2", {
//            methods: { world: function () { return "hello" } }
//        })
//    })
    
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
    
    
    self.ok(Com.test.module, "There is something in the module spot")
    self.ok(Com.test.module.meta, "And is has a meta object")
    self.ok(Com.test.module.meta.meta, "And a meta meta object")
    self.ok(Com.test.module.meta.meta.isa(Joose.Module), "And it is a Module")
    self.ok(Com.test.module.meta.meta.isa(Joose.Module), "And it is a Module")
    self.ok(Com.test.module.meta.getName() == "Com.test.module", "The name is correct")
    
    self.ok(Com.test.module.Test1, "There is also something in the class spot")
    self.ok(Com.test.module.Test1.meta, "and it has a meta object")
    self.ok(Com.test.module.Test1.meta.meta.isa(Joose.Class), "it is a class")
    
    self.ok(Com.test.module.Test2, "There is also something in the class spot")
    self.ok(Com.test.module.Test2.meta, "and it has a meta object")
    self.ok(Com.test.module.Test2.meta.meta.isa(Joose.Class), "it is a class")
    
    self.ok(Com.test.module.Test1.meta.className()  == "Com.test.module.Test1", "The class name is correct")
    self.ok(Com.test.module.Test2.meta.className() == "Com.test.module.Test2", "The class name is correct")
    
    self.ok(Com.test.module.meta.alias, "There is an alias method");
    Com.test.module.meta.alias(thistop)
    self.ok(thistop.Test1, "There is something in the expected spot")
    self.ok(thistop.Test1 === Com.test.module.Test1, "Class is now global")
    
    self.ok(new thistop.Test1(), "We can instantiate class")
    var o = new thistop.Test1();
    self.ok(o.world() == "hello", "and call methods on them")
    
    self.ok(new Com.test.module.Test1(), "We can also instantiate the fully qualified name");
    self.ok(new Com.test.module.Test1().world() == "hello", "and call methods on them");
    
    self.lives_ok(function () {Com.test.module.meta.alias(thistop)}, 
        "We can import again")
    self.ok(new thistop.Test1().world() == "hello", "and call methods")
   
    thistop.Test1 = function() {};
    self.throws_ok(function () {Com.test.module.meta.alias(thistop)}, 
        "here is already something else",
        "Importing fails if there is already something else")
    
    Module("Com.test", function () {
        Class("Test1", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new Com.test.Test1(), "we can make modules on a lower hierarchy")
    
    Module("Com.test", function () {
        Class("Test2", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new Com.test.Test1(), "We can do declare modules multiple times. The formerly declared class is still there")
    self.ok(new Com.test.Test2(), "we can make modules on a lower hierarchy. The new class is here.")
    
    self.throws_ok(function () {
        Module("Joose.SimpleRequest", function () {
            Class("FooBar", {})
        })
    }, "Trying to setup module", "We cannot put a module in a used spot")
    
    
    Module("Com.test.module", function (m) {
        self.ok(new m.Test1().world() == "hello", "Module passes the current module to the module creation function")
    })
    
    
    self.throws_ok(function () {
        Module("Com.test.meta.bla", function () {
            
        })
    }, "Module names may not include a part called 'meta'.", "meta is not allowed in a module name")
    
    
    self.ok(__global__.nomodule, "There is a global module")
    
    self.ok(__global__.nomodule.meta.meta.isa(Joose.Kernel.ProtoModule), "it is actually a proto module :)")
    
    self.ok(Joose.A.exists(__global__.nomodule.meta.getNames(), "Joose.Class"), "Joose.Class is in it")
    
    self.ok(Joose.Module.getAllModules(), "We can get all modules")
}

return t;
})()
