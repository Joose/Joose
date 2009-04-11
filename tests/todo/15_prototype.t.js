(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(7)

t.testPrototype = function() {
    var self = this;
    self.ok(Joose.Prototype, "Meta-Class is here");
    
    Prototype("Proto", {
        methods: {
            one: function () { return 1 }
        }
    })
    
    var p1 = new Proto();
    var p2 = new Proto();
    
    self.ok(p1.one() == 1, "Method calls on prototypes work")
    self.ok(p2.one() == 1, "Method calls on prototypes work")
    
    p2.meta.addMethod("one", function () { return "one" });
    
    self.ok(p1.one() == 1, "Method calls on prototypes work after prototype extension")
    self.ok(p2.one() == "one", "Method calls on prototypes work after prototype extension");
    
    var p3 = new p1.constructor()
    var p4 = new p2.constructor()
    self.ok(p3.one() == 1, "Method calls on prototypes work after instantiation of a prototype");
    self.ok(p4.one() == "one", "Method calls on prototypes work after instantiation of a prototype");
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
