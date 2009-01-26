(function() {
var t = new Test.TAP.Class();
t.plan(31);
    
t.testMethodMetaClass = function() {
    var self = this;
    self.diag("Methods");
        
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
        
    self.ok(o.hello() == "world", "Can call method hello")
        
    self.ok(o.one() == 1, "We can add and call another method");
    self.ok(o.two() == 2, "We can add multiple methods at once");
    self.ok(o.identity(1) == 1, "We can call methods with one parameter");
    self.ok(o.identity2(1, 2) == 2, "We can call methods with two parameters");
    
    var m = o.meta.getMethodObject("one")
    self.ok(m, "Mthod has meta object")
    self.is(m.getName(), "one", "name is correct")
    self.ok(!m.isFromSuperClass(), "method is not from super classs")
    
    Class("Subclass", {
        isa: TestClass,
        
        methods: {
            two: function () { return 2 }
        }
    })
    
    self.ok(!Subclass.meta.getMethodObject("two").isFromSuperClass(), "New method is not from super class")
    self.ok( Subclass.meta.getMethodObject("one").isFromSuperClass(), "Inherited method is from super class")
    
    self.ok(m.meta.isa(Joose.Kernel.ProtoMethod), "Methods of Joose.Classes are Joose.Kernel.ProtoMethods")
    
    Class("MoreMethods", {
        methods: {
            one: function () { return 1 },
            two: function () { return 2 }
        },
        classMethods: {
            getName: function () { return "Joose" }
        }
    })
    
    self.ok(MoreMethods.getName, "We have a classmethod")
    self.ok(MoreMethods.meta.classCan("getName"), "classCan works on class methods");
    self.ok(!MoreMethods.meta.can("getName"), "can works on instance methods");
    self.ok(!MoreMethods.meta.classCan("one"), "classCan works on instance methods");
    self.ok(MoreMethods.getName() == "Joose", "And it returns the correct result")
    
    self.ok(!MoreMethods.one, "No instance method in the class spot")
    
    var m = new MoreMethods();
    self.ok(m.one() == 1, "Can still call instance methods")
    self.ok(!m.getName, "No class method in the instance")
    self.ok(m.constructor.getName() == "Joose", "Can call the class method on the constructor")
    
    
    Joose.A.each(["initialize","toString","detach","one","two"], function (methodName) {
        self.can_ok(m, methodName)
    })
    
    self.diag("Methods and class methods with the same name")
    Class("SameName", {
        methods: {
            method: function () { return "instance" }
        },
        classMethods: {
            method: function () { return "class" }
        }
    })
    
    var o = new SameName();
    
    self.ok(SameName.meta.can("method"), "Instance method found")
    self.ok(SameName.meta.classCan("method"), "Class method found")
    self.ok(o.meta.can("method"), "Instance method found on object")
    self.ok(o.meta.classCan("method"), "Class method found on object")
    
    self.ok(o.method() == "instance", "Instance method works")
    self.ok(SameName.method() == "class", "Class method works")
};

return t;
})();
