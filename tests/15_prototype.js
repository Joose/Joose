plan(7)


ok(Joose.Prototype, "Meta-Class is here");

Prototype("Proto", {
    methods: {
        one: function () { return 1 }
    }
})

var p1 = new Proto();
var p2 = new Proto();

ok(p1.one() == 1, "Method calls on prototypes work")
ok(p2.one() == 1, "Method calls on prototypes work")

p2.meta.addMethod("one", function () { return "one" });

ok(p1.one() == 1, "Method calls on prototypes work after prototype extension")
ok(p2.one() == "one", "Method calls on prototypes work after prototype extension");

var p3 = new p1.constructor()
var p4 = new p2.constructor()
ok(p3.one() == 1, "Method calls on prototypes work after instantiation of a prototype");
ok(p4.one() == "one", "Method calls on prototypes work after instantiation of a prototype");

endTests()
