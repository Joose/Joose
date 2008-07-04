plan(22)

diag("Inheritance");

Class("TestClass", {
    methods: {
        hello: function () {
            return "world"
        },
        one: function () { return 1 },
        two: function () { return 2 },
        identity: function (para) { return para },
        identity2: function (para1, para2) { return para2 }
    }
});

Class("TestClass2", {})
    
Class("Subclass", {
    isa: TestClass
});
    
ok(Subclass, "Subclass created")

    
ok(Subclass, "Sublass still there after inheritance")
    
var s = new Subclass();
    
//TODO ok(s.another, "Subclass has an Attribute from TestClass");
ok(s.one() == 1, "Subclass's objects can call methods from TestClass")
    
ok(s.meta.isa(TestClass), "isa knows about our parent")
ok(!s.meta.isa(TestClass2), "TestClass2 is not out parent")

fail(function () { s.meta.isa("TestClass") }, "Parameter must not be a string.", "isa takes an object parameter")


Class("SuperClass", {
    has: {
        one: {init: 1},
        two: {init: 2, is: rw}
    }
})

Class("SubClass", {
    isa: SuperClass,
    has: {
        three: {init: 3}
    }
})
ok(SuperClass.meta.getAttribute("one"), "SuperClass has attr one")
ok(SuperClass.meta.getAttribute("one").getName() == "one", "attr name is correct")
ok(SuperClass.meta.getAttribute("two").getName() == "two", "attr name is correct")

ok(SubClass.meta.getAttribute("three"), "SubClass has attr three")
ok(SubClass.meta.getAttribute("three").getName() == "three", "attr name is correct")
ok(SubClass.meta.getAttribute("one"), "SubClass has inherited attr one")
ok(SubClass.meta.getAttribute("one").getName() == "one", "attr name is correct")
ok(SubClass.meta.getAttribute("two").getName() == "two", "attr name is correct")

var sup = new SuperClass();
var sub = new SubClass();

ok(sup.meta.getAttribute("one"), "SuperClass has attr one")
ok(sup.meta.getAttribute("one").getName() == "one", "attr name is correct")
ok(sup.meta.getAttribute("two").getName() == "two", "attr name is correct")

ok(sub.meta.getAttribute("three"), "SubClass has attr three")
ok(sub.meta.getAttribute("three").getName() == "three", "attr name is correct")
ok(sub.meta.getAttribute("one"), "SubClass has inherited attr one")
ok(sub.meta.getAttribute("one").getName() == "one", "attr name is correct")
ok(sub.meta.getAttribute("two").getName() == "two", "attr name is correct")


endTests()