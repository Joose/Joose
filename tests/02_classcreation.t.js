(function() {
var t = new Test.TAP.Class();

t.plan(35)
    
t.diag("MetaClass");

t.testClassCreation = function () {
    this.ok(Joose.Class, "We have the meta class")
    this.ok(Joose.Class.meta.isa(Joose.Kernel.MetaClass), "meta class isa MetaClass")
            
    this.diag("Class creation");
    Class("TestClass", {
        has: {
            test: {is: rw, init: 1}
        }
    });
        
    this.ok(TestClass, "We made a class")
    this.ok(TestClass.meta.className() == "TestClass", "The name is correct")
        
    var o = new TestClass();
    this.ok(o, "We made an object");
    
    this.diag("Attributes")
        
    o = new TestClass();
    
    this.ok(o.test == 1, "We have an attribute")
    o.test = 2;
    this.ok(o.test == 2, "We can set attributes")
    this.ok(o.meta.getAttribute, "There is a getAttribute method")
    var at = o.meta.getAttribute("test")
    this.ok(at, "Attribute object exists");
    this.ok(at.getName() == "test", "The attributes name is correct")
        
    this.diag("Multiple Classes")
        
//    debugger;
    Class("TestClass2", {
        has: {test2: {is: rw, init: 1}}
    });
        
    this.ok(TestClass2, "We made a second class")
    this.ok(TestClass2.meta.className() == "TestClass2", "The name is correct")
        
    o2 = new TestClass2();
        
    this.is(o2.test2, 1, "We have an attribute test2 on TestClass2")
        
    this.is(o.test2, null, "TestClass objects doesnt have the attribute test2")
        
    this.diag("Class extention")
        
    this.is(o.another, null, "The first object doesnt have the attribute another");
        
    Class("TestClass", {
        has: {
            another: {is: rw, init: true},
            third:   {is: rw, init: 2}
        },
        
        methods: {
            setThird: function () {
                this.third = 3
            }
        }
    });
        
    
    
    this.ok(o.another, "The first object now has the attribute another ");
        
    var o3 = new TestClass();
        
    this.ok(o3 != o, "The two objects from TestClass differ")
        
    this.ok(o3, "We made a second object from TestClass");
    this.ok(o3.test, "o3 has test");
    this.ok(o3.another, "o3 has another");
    
    
    var o4 = new TestClass({
        test: "newVal",
        another: "fooBar",
        third:   "ignoreMe, because custom setter ignores para"
    })
    
    this.ok(o4.test == "newVal", "Initializer works");
    this.ok(o4.another == "fooBar", "Initializer works for another parameter")
    this.ok(o4.another == "fooBar", "Initializer works for another parameter")
    this.ok(o4.third   == 3, "Initializer uses setter")
    this.ok(o4.third   != "ignoreMe, because custom setter ignores para", "Initializer uses setter")
    
    this.ok(joose.isInstance(o4), "joose.isInstance recognizes instances")
    this.ok(joose.isInstance(o3), "joose.isInstance recognizes instances")
    this.ok(joose.isInstance(new TestClass()), "joose.isInstance recognizes instances")
    this.ok(!joose.isInstance(TestClass), "joose.isInstance recognizes classes")
    this.ok(!joose.isInstance(TestClass2), "joose.isInstance recognizes classes")
    this.dies_ok(function () { joose.isInstance({}) }, "isInstance only works with Joose objects and classes.", "joose.isInstance fails for generic objects")
    
    this.diag("isAbstract")
    
    Class("AbstractClass", {
        isAbstract: true,
        methods: {
            test: function () {
                throw "sublcass responsibility"
            }
        }
    })
    
    Class("ConcreteClass", {
        methods: {
            test: function () {
                return "hello"
            }
        }
    })
    
    this.ok(AbstractClass.meta.isAbstract, "Abstract class has isActract flag set")
    this.ok(!TestClass.meta.isAbstract, "Non abstract class has isActract flag not set")
    
    this.dies_ok(function () {
        new AbstractClass()
    }, AbstractClass.meta.className()+" is an abstract class and may not instantiated.", "AbstractClasses may not be instantiated")
    
    var o = new ConcreteClass();
    this.is(o.test(), "hello", "Concrete sublass of AbstractClass may be instantiated")
}

return t;
})();
