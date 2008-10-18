(function() {
var t = new Test.TAP.Class();
t.plan(36)

t.testRoles = function() {
    var self = this;
    self.diag("Roles")
    
    Class("Comparable", {meta: Joose.Role});
    self.ok(Comparable, "We can make a Role");
    self.throws_ok( function () {new Comparable()}, /Roles may not be instantiated./, "Roles cannot be instantiated.")
    self.ok(Comparable.meta.meta.isa(Joose.Role), "Our meta class isa Role")
    
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
    
    self.ok(a.getValue() == 1, "Value set correctly")
    self.ok(b.getValue() == 1, "Value set correctly")
    self.ok(c.getValue() == 2, "Value set correctly")
    
    self.ok(a.isEqual(b), "Equality works")
    self.ok(b.isEqual(a), "Equality works in both directions")
    self.ok(!a.isEqual(c), "Equality works for unequal things")
    
    self.ok(a.meta.can("notEqual"), "notEqual method arrived")
    self.ok(a.notEqual(c), "Role composition works and notEqual works")
    self.ok(!a.notEqual(b), "Role composition works and notEqual works for equal things")
    
    self.ok(a.meta.does(Eq), "Class object does Role")
    self.ok(Currency.meta.does(Eq), "Class does Role")
    self.ok(!TestClass.meta.does(Eq), "TestClass doesnt do Role")
    self.ok(!new TestClass().meta.does(Eq), "TestClass object doesnt do Role")
    
    self.ok(SubCurrency.meta.does(Eq), "does works for inherited roles")
    
    self.diag("Runtime role application")
    
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
    self.ok(!TestClass.meta.does(RuntimeRole), "Role was only applied to object")
    self.ok(typeof a.constructor.prototype.appliedAtRuntime == "function", "... object got method from runtime role (in prototype)")
    self.ok(typeof a.appliedAtRuntime == "function", "object got method from runtime role")
    self.ok(a.appliedAtRuntime(), "object can call method");
    self.ok(!b.appliedAtRuntime, "other object does not have it");
    self.ok(!new Currency(2).appliedAtRuntime, "New object do not have it either")
    self.ok(a.meta.className() != "Currency", "a is no longer of exact type Currency: "+a.meta.className());
    self.ok(a.meta.isa(Currency), "but a is still a currency")
    self.ok(a.getValue() == 12345678, "Method modifier from runtime role works")
    
    self.ok(a.meta.does(RuntimeRole), "does works for runtime roles")
    
    self.diag("Removing roles")
   
    self.skip(typeof has__proto__ == 'function', 
        "Experimental feature Role.unapply does not work in browser without object.__proto__", 
        function () {
            RuntimeRole.meta.unapply(a);
            self.ok(!a.meta.does(RuntimeRole), "Role was removed")
            self.ok(!a.meta.can("appliedAtRuntime"), "... object reports that method from removed role is gone")
            self.ok(typeof a.constructor.prototype.appliedAtRuntime == "undefined", "... method from role is gone from prototype")
            self.ok(typeof a.appliedAtRuntime == "undefined", "... method from role is gone")
            self.ok(a.getValue() != 12345678, "... method modifier is gone")
            self.ok(a.meta.isa(Currency), "but a is still a currency")
    
    })
    self.diag("Role inheritance");
    
    self.ok(Joose.Role.meta.c === Joose.Role, "The Joose.Role meta class knows about the Joose.Role class")
    
    self.throws_ok(function () {
        Class("EqLevel2", {
            isa: Eq,
            methods: {
                level2: function () { return 2 }
            }
        })
    }, /Roles may not inherit from a super class./, "Roles may not inherit from a super class.")
    
    self.diag("Method modifiers in roles")
    
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
    self.ok(sayString == "May I talk to you?\nHello!\nI am a Joose user.\n", "Method modifiers in roles work (before, after)")
    
    var adam = new Adam();
    sayString = ""
    adam.sayHello()
    self.ok(sayString == "Stutter\nMay I talk to you?\nHello!\nI am a Joose user.\nMay I talk to you?\nHello!\nI am a Joose user.\n", "Method modifiers in roles work (before, after, around, override. Multi override in the same role)")
    
    self.diag("Meta roles")
    
    Role("MetaRole", {
        methods: {
            handlePropspecial: function (para) {
                var ret = para;
                this.addMethod("special", function () {
                    return ret
                })
            }
        }
    })
    
    Role("RoleWithMetaRole", {
        metaRoles: [MetaRole],
        methods: {
            myMethod: function () {
                return "test"
            }
        }
    })
    
    Class("ClassWithMetaRole", {
        does: [RoleWithMetaRole],
        special: "foo"
    })
    
    self.ok(ClassWithMetaRole.meta.can("myMethod"), "Method from role arrived")
    self.ok(ClassWithMetaRole.meta.meta.can("handlePropspecial"),  "Method from meta role arrived")
    self.ok(!Adam.meta.meta.can("handlePropspecial"),  "Method from meta role was not added to other classes of the same meta class")
    self.ok(ClassWithMetaRole.meta.can("special"),  "Handler from meta role was executed")
    var obj = new ClassWithMetaRole()
    self.ok(obj.special() == "foo", "Method from meta role returns correct result")
}
return t;
})();
