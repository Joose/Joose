plan(6)

Class("Eq", {
    meta: Joose.Role,
    requires: ["isEqual"],
    methods: {
        notEqual: function (para) {
            return !this.isEqual(para)
        }
    }
});

diag("Alternative Building")

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

ok(a.isEqual(b), "Equality works")
ok(b.isEqual(a), "Equality works in both directions")
ok(!a.isEqual(c), "Equality works for unequal things")

ok(a.notEqual(c), "Role composition works and notEqual works")
ok(!a.notEqual(b), "Role composition works and notEqual works for equal things")
fail(function () {
    Class("Invalid", {
        has: ["test"],
        invalidBuilder: {}
    })
}, "Called invalid builder", "Calling invalid builder throws correct exception")

endTests()