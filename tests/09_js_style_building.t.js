(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(8)

t.testJsStyleClassBuild = function() {
    var self = this;    
    
    Class("Eq", {
        meta: Joose.Role,
        requires: ["isEqual"],
        methods: {
            notEqual: function (para) {
                return !this.isEqual(para)
            }
        }
    });
    
    self.diag("Alternative Building")
    
    Class("Currency2", {
        does: Eq,
        has:  {"_value": {is: rw}},
        methods: {
            initialize: function (value) {
                this.setValue(value)
            },
        
            isEqual: function (cur) {
                return this.getValue() == cur.getValue()
            }
        }
    })
    
    var a = new Currency2(1);
    var b = new Currency2(1);
    var c = new Currency2(2);
    
    self.ok(a.isEqual(b), "Equality works")
    self.ok(b.isEqual(a), "Equality works in both directions")
    self.ok(!a.isEqual(c), "Equality works for unequal things")
    
    self.ok(a.notEqual(c), "Role composition works and notEqual works")
    self.ok(!a.notEqual(b), "Role composition works and notEqual works for equal things")
    self.throws_ok(function () {
        Class("Invalid", {
            has: ["test"],
            invalidBuilder: {}
        })
    }, /Called invalid builder/, 
    "Calling invalid builder throws correct exception")
    
    self.diag("Custom class builder")
    
    Class("CustomPropMetaClass", {
        isa: Joose.Class,
        methods: {
            handlePropcustomBuilder: function (para) {
                self.ok(para == "test", "custom builder method called with correct parameter")
            }
        }
    })
    
    Class("ClassWithCustomBuilder", {
        meta: CustomPropMetaClass,
        methods: {
            foo: function () {
                return "bar"
            }
        },
        
        customBuilder: "test"
    })
    
    self.can_ok(ClassWithCustomBuilder, "foo")
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
