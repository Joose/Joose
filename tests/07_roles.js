plan(37)

diag("Roles")

Class("Comparable", {meta: Joose.Role});
ok(Comparable, "We can make a Role");
fail( function () {new Comparable()}, "Roles may not be instantiated.", "Roles cannot be instantiated.")
ok(Comparable.meta.meta.isa(Joose.Role), "Our meta class isa Role")

Role("Eq", {
    requires: ["isEqual"],
    methods: {
        notEqual: function (para) {
            return !this.isEqual(para)
        }
    }
});


Class("Currency", {
    does: Eq,
    has: {value: {is: rw}},

    methods: {
        
        isEqual: function (cur) {
            return this.getValue() == cur.getValue()
        }    
    }
})

Class("SubCurrency", {
    isa: Currency
})

Class("TestClass", {
    methods: {
        orig: function () {
            return true
        }
    }
})

Currency.meta.validateClass()

var a = new Currency({value: 1});
var b = new Currency({value: 1});
var c = new Currency({value: 2});

ok(a.getValue() == 1, "Value set correctly")
ok(b.getValue() == 1, "Value set correctly")
ok(c.getValue() == 2, "Value set correctly")

ok(a.isEqual(b), "Equality works")
ok(b.isEqual(a), "Equality works in both directions")
ok(!a.isEqual(c), "Equality works for unequal things")

ok(a.meta.can("notEqual"), "notEqual method arrived")
ok(a.notEqual(c), "Role composition works and notEqual works")
ok(!a.notEqual(b), "Role composition works and notEqual works for equal things")

ok(a.meta.does(Eq), "Class object does Role")
ok(Currency.meta.does(Eq), "Class does Role")
ok(!TestClass.meta.does(Eq), "TestClass doesnt do Role")
ok(!new TestClass().meta.does(Eq), "TestClass object doesnt do Role")

ok(SubCurrency.meta.does(Eq), "does works for inherited roles")

diag("Runtime role application")

Class("RuntimeRole", {
    meta: Joose.Role,
    requires: "getValue",
    methods: {
        appliedAtRuntime: function () { return true }
    },
    
    around: {
        getValue: function () {
            return 12345678
        }
    }
})

//alert(a.hasOwnProperty("appliedAtRuntime"))
RuntimeRole.meta.apply(a);
//alert(a.hasOwnProperty("appliedAtRuntime"))
ok(!TestClass.meta.does(RuntimeRole), "Role was only applied to object")
ok(typeof a.constructor.prototype.appliedAtRuntime == "function", "... object got method from runtime role (in prototype)")
ok(typeof a.appliedAtRuntime == "function", "object got method from runtime role")
ok(a.appliedAtRuntime(), "object can call method");
ok(!b.appliedAtRuntime, "other object does not have it");
ok(!new Currency(2).appliedAtRuntime, "New object do not have it either")
ok(a.meta.className() != "Currency", "a is no longer of exact type Currency: "+a.meta.className());
ok(a.meta.isa(Currency), "but a is still a currency")
ok(a.getValue() == 12345678, "Method modifier from runtime role works")

ok(a.meta.does(RuntimeRole), "does works for runtime roles")

diag("Removing roles")

todo(!has__proto__(), "Experimental feature Role.unapply does not work in browser without object.__proto__", function () {

    RuntimeRole.meta.unapply(a);
    ok(!a.meta.does(RuntimeRole), "Role was removed")
    ok(!a.meta.can("appliedAtRuntime"), "... object reports that method from removed role is gone")
    ok(typeof a.constructor.prototype.appliedAtRuntime == "undefined", "... method from role is gone from prototype")
    ok(typeof a.appliedAtRuntime == "undefined", "... method from role is gone")
    ok(a.getValue() != 12345678, "... method modifier is gone")
    ok(a.meta.isa(Currency), "but a is still a currency")

})
diag("Role inheritance");

ok(Joose.Role.meta.c === Joose.Role, "The Joose.Role meta class knows about the Joose.Role class")

fail(function () {
    Class("EqLevel2", {
        isa: Eq,
        methods: {
            level2: function () { return 2 }
        }
    })
}, "Roles may not inherit from a super class.", "Roles may not inherit from a super class.")

diag("Method modifiers in roles")

var sayString = ""
function printToSayString(msg) {
    sayString += msg + "\n"
}

Class("Person", {
    methods: {
        sayHello: function () {
            printToSayString("Hello!")
        }
    }
})

Role("Stuttering", {
    around: {
        // say it twice
        sayHello: function (orig) {
            orig()
            orig()
        }
    },
    override: {
        // say Stutter and and say what was defined before
        sayHello: function () {
            printToSayString("Stutter")
            this.SUPER()
        }
    }
})

Role("ShyPerson", {
    before: {
        sayHello: function () {
            printToSayString("May I talk to you?")
        }
    }
})

Role("Introduction", {
    after: {
        sayHello: function () {
            printToSayString("I am a Joose user.")
        }
    }
})

Class("Person", {
    methods: {
        sayHello: function () {
            printToSayString("Hello!")
        }
    }
})


Class("Eve", {
    isa: Person,
    does: [
        Introduction,
        ShyPerson
    ]
})

Class("Adam", {
    isa: Person,
    does: [
        Introduction,
        ShyPerson,
        Stuttering
    ]
})

var eve = new Eve();
sayString = ""
eve.sayHello()
ok(sayString == "May I talk to you?\nHello!\nI am a Joose user.\n", "Method modifiers in roles work (before, after)")

var adam = new Adam();
sayString = ""
adam.sayHello()
ok(sayString == "Stutter\nMay I talk to you?\nHello!\nI am a Joose user.\nMay I talk to you?\nHello!\nI am a Joose user.\n", "Method modifiers in roles work (before, after, around, override. Multi override in the same role)")

endTests()