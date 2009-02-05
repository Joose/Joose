(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(7)

t.testDetach = function() {

    Class("TestClass", {
        methods: {
            one: function () { return 1 }
        }
    })

    Class("SubClass", {
        isa: TestClass,
        methods: {
            two: function () { return 2 }
        }
    })

    var o1 = new SubClass();
    var o2 = new SubClass();
    t.ok(o1.one() == 1 && o1.two() == 2, "Methods return correct results");
    t.ok(o2.one() == 1 && o2.two() == 2, "Methods return correct results");

    o2.detach()

    o2.meta.addMethod("one", function () { return 3 });

    t.ok(o1.one() == 1 && o1.two() == 2, "Methods return correct results for non detached object after detach of object of same class");
    t.ok(o2.one() == 3 && o2.two() == 2, "Methods return correct results in detached object");

    var o3 = o1.meta.instantiate()
    var o4 = o2.meta.instantiate()

    var o5 = new SubClass();

    t.ok(o5.one() == 1 && o5.two() == 2, "Methods of new object return correct results for non detached object after detach of object of same class");
    t.ok(o3.one() == 1 && o3.two() == 2, "Methods of new object return correct results for non detached object after detach of object of same class");
    t.ok(o4.one() == 3 && o4.two() == 2, "Methods of new object return correct results in detached object");

    
//    TODO
//    SubClass.meta.addMethod('three', function () { return 3 });
//    
//    if (typeof o2.three != 'function') {
//    	t.ok(true, "Detached instance is not affected by changes in original class");
//    } else {
//    	t.ok(false, "Detached instance is not affected by changes in original class");
//    }
    
}
return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype);