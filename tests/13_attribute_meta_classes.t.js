(function() {
var t = new Test.TAP.Class();
t.plan(45)

t.testConstrainedAttributes = function() {
    var self = this;
    self.diag("Test constrained attributes")
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
    
    self.ok(constrained.setAttr1(new AttrClass()), "Can set to correct class")
    self.throws_ok(function () {
       constrained.setAttr1(new AttrClassWithRole())
    }, 
    /The attribute attr1 only accepts values that are objects of type AttrClass/, 
    "Setting to wrong type fails")
    
    self.ok(constrained.setAttr2(new AttrClassWithRole()), "Can set to class with correct role")
    self.throws_ok(function () {
       constrained.setAttr2(new AttrClass())
    }, 
    /The attribute attr2 only accepts values that are objects of type AttrRole/, 
    "Setting fails if role is missing")
    
    self.throws_ok(function () {
       constrained.setAttr2("Scalar")
    }, 
    /The attribute attr2 only accepts values that have a meta object./, 
    "Setting fails if object is not a Joose object")
    
    
    self.diag("Test handles property")
    
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
    
    self.ok(car.stop, "Car got stop method")
    self.ok(car.drive, "Car got drive method")
    self.ok(car.leftRearWheel.meta.isa(Wheel), "leftRearWheel is of correct type" );
    
    self.ok(car.setLeftRearWheel(new Wheel()), "We can set typed attributes")
    self.throws_ok(function () { car.setLeftRearWheel({}) }, 
        /only accepts values that have a meta object/, 
        "Setting to non Joose type {} gives error")
    self.throws_ok(function () { car.setLeftRearWheel([]) }, 
        /only accepts values that have a meta object/, 
        "Setting to non Joose type [] gives error")
    self.throws_ok(function () { car.setLeftRearWheel(1) }, 
        /only accepts values that have a meta object/, 
        "Setting to non Joose type 1 gives error")
    self.throws_ok(function () { car.setLeftRearWheel(null) }, 
        /only accepts values that have a meta object/, 
        "Setting to non Joose type null gives error")
    self.throws_ok(function () { car.setLeftRearWheel(new Car()) }, 
        /only accepts values that are objects of type Wheel/, 
        "Setting to wrong type gives error")
    
    
    self.ok(car.leftRearWheel.state == "stopped", "wheel is initialized")
    car.drive()
    self.ok(car.leftRearWheel.state == "running", "drive method is correctly forwarded")
    car.stop()
    self.ok(car.leftRearWheel.state == "stopped", "stop method is correctly forwarded")
    
    self.ok(car.getDriver, "We could get a driver");
    self.ok(car.getDriver() == "Joose", "Lazy attributes work")
    
    
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
    
    self.ok(b.drive && b.stop, "Methods are there");
    self.ok(b.drive() == "drive", "handleWith works and has correct handler")
    self.ok(b.stop() == "stop", "handleWith works and has correct handler")
    
    self.diag("Initializers")
    
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
    
    self.is(t1.getOne(), 1, "Not initialized")
    self.is(t1.getTwo(), 2, "Initialized")
    self.is(t1._three,   3, "Initialized private var")
    
    var t1 = new BasicInitTest({one: "one", two: 2});
    
    self.is(t1.getOne(), "one", "Init overriden")
    self.is(t1.two,      2, "Initialized")
    self.is(t1._three,   null, "Initialized private var")
    
    self.throws_ok(function () { new BasicInitTest({one: 1, three: 3}) }, 
    /Required initialization parameter missing: two/, 
    "Init without required para fails")
    
    self.lives_ok(function () {var t3 = new BasicInitTest({one: 1, two: null})}, 
        "Null is a valid init value")
    
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
    
    self.ok(typeof t1.lazy == "function", "Attr has not been initialized");
    self.is(t1.getLazy(), "lazy", "Lazy evaluation works");
    self.ok(typeof t1.lazy == "string", "Attr is now initialized");
    self.ok(typeof t1.eager == "string", "Eager attr is initialized immediately");
    self.ok(t1.getEager() == "eager", "Eager attr is initialized immediately");
    
    self.diag("attr inheritance")
    
    Class("SubLazyInit", {
        isa: LazyInit,
        
        has: {
            foo: {
                is: "rw"
            }
        }
    })
    
    var t1 = new SubLazyInit({ foo: "bar" }) 
    self.ok(typeof t1.lazy == "function", "Attr has not been initialized");
    self.is(t1.getLazy(), "lazy", "Lazy evaluation works");
    self.ok(typeof t1.lazy == "string", "Attr is now initialized");
    self.ok(typeof t1.eager == "string", "Eager attr is initialized immediately");
    self.ok(t1.getEager() == "eager", "Eager attr is initialized immediately");
    self.ok(t1.getFoo() == "bar", "New attr is initialized");
    
    // Tests for Issue #8
    Class("SuperClassWithAttr", {
        has: {
            test: {
                is: "rw",
                init: 0
            }
        },
        override: {
            getTest: function () {
                this.test++;
                return this.SUPER();
            },
            setTest: function (val) {
                this.SUPER(val + 1)
            }
        }
    })
    Class("SubClassOfSuperClassWithAttr", {
        isa: SuperClassWithAttr
    })
    var o = new SuperClassWithAttr();
    t.is(o.getTest(), 1, "Super class shows correct behavior")
    o.setTest(3);
    t.is(o.getTest(), 5, "Super class shows correct behavior")
    var o = new SubClassOfSuperClassWithAttr();
    t.is(o.getTest(), 1, "Override of attr getter was inherited")
    o.setTest(3);
    t.is(o.getTest(), 5, "Override of attr setter was inherited")
}

return t;
})()
