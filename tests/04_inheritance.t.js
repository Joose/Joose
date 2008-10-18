(function() {
var t = new Test.TAP.Class();
t.plan(36)

t.testInheritance = function() {
    var self = this;
    self.diag("Inheritance");
    
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
        
    self.ok(Subclass, "Subclass created")
    
        
    self.ok(Subclass, "Sublass still there after inheritance")
        
    var s = new Subclass();
    
    self.ok(s.meta.isa(TestClass), "isa knows about our parent")
    self.ok(!s.meta.isa(TestClass2), "TestClass2 is not out parent")
    
    self.throws_ok(function () { s.meta.isa("TestClass") }, 
        /Parameter must not be a string./, "isa takes an object parameter")
    
    self.diag("Test instance methods")
        
    self.can_ok(s, "one")
    self.can_ok(s, "two")
    self.ok(s.one() == 1, "Subclass's objects can call methods from TestClass")
    self.ok(s.two() == "overridden", "Subclass can override methods")
    
    self.ok(s.meta.getMethodObject("one").isFromSuperClass(), "isFromSuperClass set for method from super class")
    self.ok(!s.meta.getMethodObject("two").isFromSuperClass(), "isFromSuperClass not set for overridden method")
        
    self.diag("Test class methods")
        
    self.can_ok(Subclass, "classMethod1")
    self.can_ok(Subclass, "one")
    self.can_ok(Subclass, "classMethod1")
    
    self.ok(!s.meta.can("classMethod1"), "Class method is not inherited as instance method")
    
    self.ok(Subclass.classMethod1() == 1, "Subclass's objects can call class methods from TestClass")
    self.ok(Subclass.one() == "class", "Can inherit instance and class methods of the same name")
    self.ok(Subclass.classMethod2() == "overridden", "Subclass can override methods")
    
    self.ok(Subclass.meta.getClassMethodObject("classMethod1").isFromSuperClass(), "isFromSuperClass set for class method from super class")
    self.ok(!Subclass.meta.getClassMethodObject("classMethod2").isFromSuperClass(), "isFromSuperClass not set for overridden class method")
        
    self.diag("Test attribute inheritance")
    
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
    self.ok(SuperClass.meta.getAttribute("one"), "SuperClass has attr one")
    self.ok(SuperClass.meta.getAttribute("one").getName() == "one", "attr name is correct")
    self.ok(SuperClass.meta.getAttribute("two").getName() == "two", "attr name is correct")
    
    self.ok(SubClass.meta.getAttribute("three"), "SubClass has attr three")
    self.ok(SubClass.meta.getAttribute("three").getName() == "three", "attr name is correct")
    self.ok(SubClass.meta.getAttribute("one"), "SubClass has inherited attr one")
    self.ok(SubClass.meta.getAttribute("one").getName() == "one", "attr name is correct")
    self.ok(SubClass.meta.getAttribute("two").getName() == "two", "attr name is correct")
    
    var sup = new SuperClass();
    var sub = new SubClass();
    
    self.ok(sup.meta.getAttribute("one"), "SuperClass has attr one")
    self.ok(sup.meta.getAttribute("one").getName() == "one", "attr name is correct")
    self.ok(sup.meta.getAttribute("two").getName() == "two", "attr name is correct")
    
    self.ok(sub.meta.getAttribute("three"), "SubClass has attr three")
    self.ok(sub.meta.getAttribute("three").getName() == "three", "attr name is correct")
    self.ok(sub.meta.getAttribute("one"), "SubClass has inherited attr one")
    self.ok(sub.meta.getAttribute("one").getName() == "one", "attr name is correct")
    self.ok(sub.meta.getAttribute("two").getName() == "two", "attr name is correct")
};

return t;
})();
