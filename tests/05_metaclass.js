plan(29)

function debuggable () {
diag("Meta class Extention");
    
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
    
ok(o.hello() == 1, "Can call methods on MyClass");
ok(MyClass.meta.iAmMeta(), "We can extend the meta class");
ok(o.test == 1, "Initializers can be wrapped")
isNull(MyClass.iAmMeta, "MyClass does not have the new meta class method");

diag("Instantiation");
    
ok(MyClass.meta.instantiate().hello() == 1, "We can instantiate a class through the meta class")
ok(new MyClass().meta.instantiate().hello() == 1, "We can instantiate a class through the meta class from an instance")
ok(MyClass.meta.instantiate().test == 1, "Wrapped intializers run with meta instantiation")

ok(MyClass.meta instanceof Joose.Class, "Meta object of class instanceof Joose.Class")
ok(o.meta instanceof Joose.Class, "Meta object of instance instanceof Joose.Class")
ok(MyClass.meta === o.meta, "Meta object of class and its instance is identical")

diag("Custom MetaClass");

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

ok(TestMeta.meta.isa(Joose.Class), "Meta class isa Joose.Class")
ok(TestMeta.meta.isa(TestMeta), "Meta class is correct");
isEq(TestMeta.meta.className(), "TestMeta", "Meta class class name is correct");
ok(o.meta.meta.isa(TestMeta), "Meta class is correct");
ok(o.meta.meta.isa(Joose.Class), "Meta class inherits from Joose.Class");
isEq(o.meta.meta.className(), "TestMeta", "Meta class class name is correct");
ok(o.meta.testMethod, "testMethod is there")
isEq(o.meta.testMethod(), "Test", "Return value of testMethod is correct")

/* var obj = o
while(obj) {
    alert(obj)
    obj = obj.meta
}*/

ok(o.meta instanceof TestMeta, "first meta level is instanceof TestMeta")
ok(TestMeta.meta instanceof Joose.Class, "Meta Class of TestMeta is Joose.Class")
ok(o.meta.meta instanceof Joose.Class, "second meta level is instanceof Joose.Class")
ok(o.meta.meta.meta instanceof Joose.MetaClass, "third meta level is instanceof Joose.MetaClass")
ok(o.meta.meta.meta.meta instanceof Joose.MetaClassBootstrap, "fourth meta level is instanceof Joose.MetaClassBootstrap")


canOk(o.meta, "addMethod")
canOk(o.meta.meta, "addMethod")
canOk(o.meta.meta.meta, "addMethod")

Class("SubMeta", {
    isa: TestMeta
})

ok(SubMeta.meta.isa(SubMeta), "SubMeta isa SubMeta")
ok(SubMeta.meta.isa(TestMeta), "SubMeta isa TestMeta")
ok(SubMeta.meta.isa(Joose.Class), "SubMeta isa Joose.Class")

// o is object
// o.meta is metaClass instance
}
debuggable()


endTests()