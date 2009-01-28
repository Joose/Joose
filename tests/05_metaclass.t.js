(function() {
var t = new Test.TAP.Class();
t.plan(29)

t.testMetaClass = function() {
    var self = this;
    self.diag("Meta class Extention");
        
    Class("Joose.Class", {
        methods: {
            iAmMeta: function () { return true }
        }
    });
    
    Class("MyClass", {
        after: {
            initialize: function () {
                this.test = 1
            }
        },
        methods: {
            hello: function () { return 1 }
        }
    });
    
    var o = new MyClass();
        
    self.ok(o.hello() == 1, "Can call methods on MyClass");
    self.ok(MyClass.meta.iAmMeta(), "We can extend the meta class");
    self.ok(o.test == 1, "Initializers can be wrapped")
    self.is(MyClass.iAmMeta, null, "MyClass does not have the new meta class method");
    
    self.diag("Instantiation");
        
    self.ok(MyClass.meta.instantiate().hello() == 1, "We can instantiate a class through the meta class")
    self.ok(new MyClass().meta.instantiate().hello() == 1, "We can instantiate a class through the meta class from an instance")
    self.ok(MyClass.meta.instantiate().test == 1, "Wrapped intializers run with meta instantiation")
    
    self.ok(MyClass.meta instanceof Joose.Class, "Meta object of class instanceof Joose.Class")
    self.ok(o.meta instanceof Joose.Class, "Meta object of instance instanceof Joose.Class")
    self.ok(MyClass.meta === o.meta, "Meta object of class and its instance is identical")
    
    self.diag("Custom MetaClass");
    
    Class("TestMeta", {
        isa: Joose.Class,
        methods: {
            testMethod: function () {
                return "Test"
            }
        }
    })
    
    Class("aClass", {
        meta: TestMeta
    })
    
    var o   = new aClass();
    
    // a aClass
    // meta -> a TestMeta
    // meta -> a Joose.Class
    // meta -> a Joose.MetaClass
    
    self.ok(TestMeta.meta.isa(Joose.Class), "Meta class isa Joose.Class")
    self.ok(TestMeta.meta.isa(TestMeta), "Meta class is correct");
    self.is(TestMeta.meta.className(), "TestMeta", "Meta class class name is correct");
    self.ok(o.meta.meta.isa(TestMeta), "Meta class is correct");
    self.ok(o.meta.meta.isa(Joose.Class), "Meta class inherits from Joose.Class");
    self.is(o.meta.meta.className(), "TestMeta", "Meta class class name is correct");
    self.ok(o.meta.testMethod, "testMethod is there")
    self.is(o.meta.testMethod(), "Test", "Return value of testMethod is correct")
    
    /* var obj = o
    while(obj) {
        alert(obj)
        obj = obj.meta
    }*/
    
    self.ok(o.meta instanceof TestMeta, "first meta level is instanceof TestMeta")
    self.ok(TestMeta.meta instanceof Joose.Class, "Meta Class of TestMeta is Joose.Class")
    self.ok(o.meta.meta instanceof Joose.Class, "second meta level is instanceof Joose.Class")
    
    self.diag("3rd level: " + o.meta.meta.meta);
    self.ok(o.meta.meta.meta instanceof Joose.Kernel.MetaClass, "third meta level is instanceof Joose.Kernel.MetaClass")
    self.diag("4th level: " + o.meta.meta.meta.meta);
    self.ok(o.meta.meta.meta.meta instanceof Joose.Kernel.Roles, "fourth meta level is instanceof Joose.Kernel.Roles")
    
    
    self.can_ok(o.meta, "addMethod")
    self.can_ok(o.meta.meta, "addMethod")
    self.can_ok(o.meta.meta.meta, "addMethod")
    
    Class("SubMeta", {
        isa: TestMeta
    })
    
    self.ok(SubMeta.meta.isa(SubMeta), "SubMeta isa SubMeta")
    self.ok(SubMeta.meta.isa(TestMeta), "SubMeta isa TestMeta")
    self.ok(SubMeta.meta.isa(Joose.Class), "SubMeta isa Joose.Class")
    
    // o is object
    // o.meta is metaClass instance
}

return t;
})();
