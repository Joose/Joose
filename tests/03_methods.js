plan(25)
    

diag("Methods");
    
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
    

    
var o = new TestClass();
    
ok(o.hello() == "world", "Can call method hello")
    
ok(o.one() == 1, "We can add and call another method");
ok(o.two() == 2, "We can add multiple methods at once");
ok(o.identity(1) == 1, "We can call methods with one parameter");
ok(o.identity2(1, 2) == 2, "We can call methods with two parameters");

var m = o.meta.getMethodObject("one")
ok(m, "Mthod has meta object")
isEq(m.getName(), "one", "name is correct")
ok(!m.isFromSuperClass(), "method is not from super classs")

Class("Subclass", {
    isa: TestClass,
    
    methods: {
        two: function () { return 2 }
    }
})

ok(!Subclass.meta.getMethodObject("two").isFromSuperClass(), "New method is not from super class")
ok( Subclass.meta.getMethodObject("one").isFromSuperClass(), "Inherited method is from super class")

ok(m.meta.isa(Joose.Method), "Methods of Joose.Classes are Joose.Methods")

Class("MoreMethods", {
    methods: {
        one: function () { return 1 },
        two: function () { return 2 }
    },
    classMethods: {
        getName: function () { return "Joose" }
    }
})

ok(MoreMethods.getName, "We have a classmethod")
ok(MoreMethods.meta.classCan("getName"), "classCan works on class methods");
ok(!MoreMethods.meta.can("getName"), "can works on instance methods");
ok(!MoreMethods.meta.classCan("one"), "classCan works on instance methods");
ok(MoreMethods.getName() == "Joose", "And it returns the correct result")

ok(!MoreMethods.one, "No instance method in the class spot")

var m = new MoreMethods();
ok(m.one() == 1, "Can still call instance methods")
ok(!m.getName, "No class method in the instance")
ok(m.constructor.getName() == "Joose", "Can call the class method on the constructor")


Joose.A.each(["initialize","toString","detach","one","two"], function (methodName) {
    canOk(m, methodName)
})


endTests()