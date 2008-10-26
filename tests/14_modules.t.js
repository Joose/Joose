(function() {
var t = new Test.TAP.Class();
t.plan(35)

var thistop = Test.prototype.top

t.testModuleClass = function() {
    var self = this;
    self.ok(Joose.Module, "The module class is here")
    
    Module("com.test.module", function () {
        Class("Test1", {
            methods: { world: function () { return "hello" } }
        });
        Class("Test2", {
            methods: { world: function () { return "hello" } }
        })
    })
    
    self.ok(com.test.module, "There is something in the module spot")
    self.ok(com.test.module.meta, "And is has a meta object")
    self.ok(com.test.module.meta.meta, "And a meta meta object")
    self.ok(com.test.module.meta.meta.isa(Joose.Module), "And it is a Module")
    self.ok(com.test.module.meta.meta.isa(Joose.Module), "And it is a Module")
    self.ok(com.test.module.meta.getName() == "com.test.module", "The name is correct")
    
    self.ok(com.test.module.Test1, "There is also something in the class spot")
    self.ok(com.test.module.Test1.meta, "and it has a meta object")
    self.ok(com.test.module.Test1.meta.meta.isa(Joose.Class), "it is a class")
    
    self.ok(com.test.module.Test2, "There is also something in the class spot")
    self.ok(com.test.module.Test2.meta, "and it has a meta object")
    self.ok(com.test.module.Test2.meta.meta.isa(Joose.Class), "it is a class")
    
    self.ok(com.test.module.Test1.meta.className()  == "com.test.module.Test1", "The class name is correct")
    self.ok(com.test.module.Test2.meta.className() == "com.test.module.Test2", "The class name is correct")
    
    self.ok(com.test.module.meta.alias, "There is an alias method");
    com.test.module.meta.alias(thistop)
    self.ok(thistop.Test1, "There is something in the expected spot")
    self.ok(thistop.Test1 === com.test.module.Test1, "Class is now global")
    
    self.ok(new thistop.Test1(), "We can instantiate class")
    var o = new thistop.Test1();
    self.ok(o.world() == "hello", "and call methods on them")
    
    self.ok(new com.test.module.Test1(), "We can also instantiate the fully qualified name");
    self.ok(new com.test.module.Test1().world() == "hello", "and call methods on them");
    
    self.lives_ok(function () {com.test.module.meta.alias(thistop)}, "We can import again")
    self.ok(new thistop.Test1().world() == "hello", "and call methods")
    
    self.throws_ok(function () {com.test.module.meta.alias(thistop)}, "here is already something else", "Importing fails if there is already something else")
    
    Module("com.test", function () {
        Class("Test1", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new com.test.Test1(), "we can make modules on a lower hierarchy")
    
    Module("com.test", function () {
        Class("Test2", {
            methods: { one: function () { return 1 } }
        })
    })
    
    self.ok(new com.test.Test1(), "We can do declare modules multiple times. The formerly declared class is still there")
    self.ok(new com.test.Test2(), "we can make modules on a lower hierarchy. The new class is here.")
    
    self.throws_ok(function () {
        Module("Joose.SimpleRequest", function () {
            Class("FooBar", {})
        })
    }, "Trying to setup module", "We cannot put a module in a used spot")
    
    
    Module("com.test.module", function (m) {
        self.ok(new m.Test1().world() == "hello", "Module passes the current module to the module creation function")
    })
    
    
    self.throws_ok(function () {
        Module("com.test.meta.bla", function () {
            
        })
    }, "Module names may not include a part called 'meta'.", "meta is not allowed in a module name")
    
    
    self.ok(__global__.nomodule, "There is a global module")
    
    self.ok(__global__.nomodule.meta.meta.isa(Joose.Module), "it is actually a module :)")
    
    self.ok(Joose.A.exists(__global__.nomodule.meta.getNames(), "Joose.Class"), "Joose.Class is in it")
    
    self.ok(Joose.Module.getAllModules(), "We can get all modules")
}

return t;
})()
