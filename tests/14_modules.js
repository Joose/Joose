plan(35)

ok(Joose.Module, "The module class is here")

Module("com.test.module", function () {
    Class("Test", {
        methods: { world: function () { return "hello" } }
    });
    Class("Test2", {
        methods: { world: function () { return "hello" } }
    })
})

ok(com.test.module, "There is something in the module spot")
ok(com.test.module.meta, "And is has a meta object")
ok(com.test.module.meta.meta, "And a meta meta object")
ok(com.test.module.meta.meta.isa(Joose.Module), "And it is a Module")
ok(com.test.module.meta.meta.isa(Joose.Module), "And it is a Module")
ok(com.test.module.meta.getName() == "com.test.module", "The name is correct")

ok(com.test.module.Test, "There is also something in the class spot")
ok(com.test.module.Test.meta, "and it has a meta object")
ok(com.test.module.Test.meta.meta.isa(Joose.Class), "it is a class")

ok(com.test.module.Test2, "There is also something in the class spot")
ok(com.test.module.Test2.meta, "and it has a meta object")
ok(com.test.module.Test2.meta.meta.isa(Joose.Class), "it is a class")

ok(com.test.module.Test.meta.className()  == "com.test.module.Test", "The class name is correct")
ok(com.test.module.Test2.meta.className() == "com.test.module.Test2", "The class name is correct")

ok(com.test.module.meta.alias, "There is aan alias method");
com.test.module.meta.alias(window)
ok(Test, "There is something in the expected spot")
ok(Test === com.test.module.Test, "Class is now global")

ok(new Test(), "We can instantiate class")
var o = new Test();
ok(o.world() == "hello", "and call methods on them")

ok(new com.test.module.Test(), "We can also instantiate the fully qualified name");
ok(new com.test.module.Test().world() == "hello", "and call methods on them");

nofail(function () {com.test.module.meta.alias(window)}, "We can import again")
ok(new Test().world() == "hello", "and call methods")

Test = {};

fail(function () {com.test.module.meta.alias(window)}, "here is already something else", "Importing fails if there is already something else")


Module("com.test", function () {
    Class("Test", {
        methods: { one: function () { return 1 } }
    })
})

ok(new com.test.Test(), "we can make modules on a lower hierarchy")

Module("com.test", function () {
    Class("Test2", {
        methods: { one: function () { return 1 } }
    })
})

ok(new com.test.Test(), "We can do declare modules multiple times. The formerly declared class is still there")
ok(new com.test.Test2(), "we can make modules on a lower hierarchy. The new class is here.")

fail(function () {
    Module("Joose.SimpleRequest", function () {
        Class("FooBar", {})
    })
}, "Trying to setup module", "We cannot put a module in a used spot")


Module("com.test.module", function (m) {
    ok(new m.Test().world() == "hello", "Module passes the current module to the module creation function")
})


fail(function () {
    Module("com.test.meta.bla", function () {
        
    })
}, "Module names may not include a part called 'meta'.", "meta is not allowed in a module name")


ok(__global__.nomodule, "There is a global module")

ok(__global__.nomodule.meta.meta.isa(Joose.Module), "it is actually a module :)")

ok(Joose.A.exists(__global__.nomodule.meta.getNames(), "Joose.Class"), "Joose.Class is in it")

ok(Joose.Module.getAllModules(), "We can get all modules")

endTests()
