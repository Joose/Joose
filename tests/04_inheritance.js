plan(36)

diag("Inheritance");

Class("TestClass", {
    methods: {
        one: function () { return 1 },
        two: function () { return 2 }
    },
    
    classMethods: {
        classMethod1: function () {
            return 1
        },
        classMethod2: function () {
            return 2
        }
    }
});

Class("TestClass2", {})
    
Class("Subclass", {
    isa: TestClass,
    
    methods: {
        two: function () { return "overridden" }
    },
    
    classMethods: {
        one: function () {
            return "class"
        },
        
        classMethod2: function () {
            return "overridden"
        }
    }
});
    
ok(Subclass, "Subclass created")

    
ok(Subclass, "Sublass still there after inheritance")
    
var s = new Subclass();

ok(s.meta.isa(TestClass), "isa knows about our parent")
ok(!s.meta.isa(TestClass2), "TestClass2 is not out parent")

fail(function () { s.meta.isa("TestClass") }, "Parameter must not be a string.", "isa takes an object parameter")

diag("Test instance methods")
    
canOk(s, "one")
canOk(s, "two")
ok(s.one() == 1, "Subclass's objects can call methods from TestClass")
ok(s.two() == "overridden", "Subclass can override methods")

ok(s.meta.getMethodObject("one").isFromSuperClass(), "isFromSuperClass set for method from super class")
ok(!s.meta.getMethodObject("two").isFromSuperClass(), "isFromSuperClass not set for overridden method")
    
diag("Test class methods")
    
classCanOk(Subclass, "classMethod1")
classCanOk(Subclass, "one")
classCanOk(Subclass, "classMethod1")

ok(!s.meta.can("classMethod1"), "Class method is not inherited as instance method")

ok(Subclass.classMethod1() == 1, "Subclass's objects can call class methods from TestClass")
ok(Subclass.one() == "class", "Can inherit instance and class methods of the same name")
ok(Subclass.classMethod2() == "overridden", "Subclass can override methods")

ok(Subclass.meta.getClassMethodObject("classMethod1").isFromSuperClass(), "isFromSuperClass set for class method from super class")
ok(!Subclass.meta.getClassMethodObject("classMethod2").isFromSuperClass(), "isFromSuperClass not set for overridden class method")
    
diag("Test attribute inheritance")

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
