plan(41)

diag("Test constrained attributes")
// For type constrained attributes, see 16_types.js

Class("AttrClass", {});
Role("AttrRole",   {});
Class("AttrClassWithRole", {
    does: [AttrRole]
});

Class("ConstrainedAttr", {
    has: {
        attr1: {
            isa: AttrClass,
            is:  "rw"
        },
        
        attr2: {
            isa: AttrRole,
            is:  "rw"
        }
    }
})

var constrained = new ConstrainedAttr();

ok(constrained.setAttr1(new AttrClass()), "Can set to correct class")
fail(function () {
   constrained.setAttr1(new AttrClassWithRole())
}, "The attribute attr1 only accepts values that are objects of type AttrClass", "Setting to wrong type fails")

ok(constrained.setAttr2(new AttrClassWithRole()), "Can set to class with correct role")
fail(function () {
   constrained.setAttr2(new AttrClass())
}, "The attribute attr2 only accepts values that are objects of type AttrRole", "Setting fails if role is missing")

fail(function () {
   constrained.setAttr2("Scalar")
}, "The attribute attr2 only accepts values that have a meta object.", "Setting fails if object is not a Joose object")


diag("Test handles property")

Class("Wheel", {
    has: {
        state: {init: "stopped"}
    },
    methods: {
        drive: function () { this.state = "running" },
        stop: function () { this.state = "stopped" }
    }
})

Class("Car", {
    has: {
        leftRearWheel: {
            init: new Wheel(), 
            isa: Wheel, 
            is: rw,
            handles: "*"
        },
        driver: {
            init:      function () { return "Joose" },
            lazy:       true,
            is:        rw,
            predicate: "hasDriver"
        }
    }
})

var car = new Car();

ok(car.stop, "Car got stop method")
ok(car.drive, "Car got drive method")
ok(car.leftRearWheel.meta.isa(Wheel), "leftRearWheel is of correct type" );

ok(car.setLeftRearWheel(new Wheel()), "We can set typed attributes")
fail(function () { car.setLeftRearWheel({}) }, "only accepts values that have a meta object", "Setting to non Joose type {} gives error")
fail(function () { car.setLeftRearWheel([]) }, "only accepts values that have a meta object", "Setting to non Joose type [] gives error")
fail(function () { car.setLeftRearWheel(1) }, "only accepts values that have a meta object", "Setting to non Joose type 1 gives error")
fail(function () { car.setLeftRearWheel(null) }, "only accepts values that have a meta object", "Setting to non Joose type null gives error")
fail(function () { car.setLeftRearWheel(new Car()) }, "only accepts values that are objects of type Wheel", "Setting to wrong type gives error")


ok(car.leftRearWheel.state == "stopped", "wheel is initialized")
car.drive()
ok(car.leftRearWheel.state == "running", "drive method is correctly forwarded")
car.stop()
ok(car.leftRearWheel.state == "stopped", "stop method is correctly forwarded")

ok(car.getDriver, "We could get a driver");
ok(car.getDriver() == "Joose", "Lazy attributes work")


Class("Bike", {
    has: {
        wheel: {
            init:    new Wheel(),
            isa:     Wheel,
            is:      rw,
            handles: "*",
            handleWith: function (name) { return function () { return name } }
        }
    }
})

var b = new Bike();

ok(b.drive && b.stop, "Methods are there");
ok(b.drive() == "drive", "handleWith works and has correct handler")
ok(b.stop() == "stop", "handleWith works and has correct handler")

diag("Initializers")

Class("BasicInitTest", {
    has: {
        one: {
            is: "rw",
            init: 1
        },
        two: {
            is: "ro",
            required: true
        },
        _three: {}
    }
})

var t1 = new BasicInitTest({two: 2, three: 3});

isEq(t1.getOne(), 1, "Not initialized")
isEq(t1.getTwo(), 2, "Initialized")
isEq(t1._three,   3, "Initialized private var")

var t1 = new BasicInitTest({one: "one", two: 2});

isEq(t1.getOne(), "one", "Init overriden")
isEq(t1.two,      2, "Initialized")
isEq(t1._three,   null, "Initialized private var")

fail(function () { new BasicInitTest({one: 1, three: 3}) }, "Required initialization parameter missing: two", "Init without required para fails")

nofail(function () {var t3 = new BasicInitTest({one: 1, two: null})}, "Null is a valid init value")

Class("LazyInit", {
    has: {
        lazy: {
            is: "rw",
            lazy: true,
            init: function () { return "lazy" }
        },
        
        eager: {
            is: "rw",
            init: function () { return "eager" }
        }
    }
})

var t1 = new LazyInit();

ok(typeof t1.lazy == "function", "Attr has not been initialized");
isEq(t1.getLazy(), "lazy", "Lazy evaluation works");
ok(typeof t1.lazy == "string", "Attr is now initialized");
ok(typeof t1.eager == "string", "Eager attr is initialized immediately");
ok(t1.getEager() == "eager", "Eager attr is initialized immediately");

diag("attr inheritance")

Class("SubLazyInit", {
    isa: LazyInit,
    
    has: {
        foo: {
            is: "rw"
        }
    }
})

var t1 = new SubLazyInit({ foo: "bar" }) 
ok(typeof t1.lazy == "function", "Attr has not been initialized");
isEq(t1.getLazy(), "lazy", "Lazy evaluation works");
ok(typeof t1.lazy == "string", "Attr is now initialized");
ok(typeof t1.eager == "string", "Eager attr is initialized immediately");
ok(t1.getEager() == "eager", "Eager attr is initialized immediately");
ok(t1.getFoo() == "bar", "New attr is initialized")

endTests()
