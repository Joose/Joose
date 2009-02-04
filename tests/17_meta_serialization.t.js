(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(0);

t.testMetaSerialization = function() {
    var self = this;
    Joose.Storage.meta.apply(Joose.Class)
    Joose.Kernel.MetaClass.meta.addMethod("toJSON", function () {
        return "__META__"
    })
    Joose.Storage.meta.apply(Joose.Attribute);
    Joose.Storage.meta.apply(Joose.Method);
    Joose.Storage.meta.apply(Joose.ClassMethod);
    
    Class("Point", {
        has: {
            x: {
                is:   "rw",
                init: 0
            },
            y: {
                is:   "rw",
                init: 0
            }
        },
        methods: {
            clear: function () {
                this.setX(0);
                this.setY(0);
            }
        }
    })
    
    Joose.Storage.Unpacker.patchJSON();
    Point.meta.addRole(Joose.Storage);
    self.diag(JSON.stringify(Point.meta))
    
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
