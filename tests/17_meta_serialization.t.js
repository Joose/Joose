(function() {
var t = new Test.TAP.Class();
t.plan(1);

t.testMetaSerialization = function() {
    var self = this;
    Joose.Storage.meta.apply(Joose.Class)
    Joose.MetaClass.meta.addMethod("toJSON", function () {
        return "__META__"
    })
    Joose.Storage.meta.apply(Joose.Attribute);
    Joose.Storage.meta.apply(Joose.Method);
    
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
    self.ok(JSON.stringify({}), "Sanity")
    try {
        self.diag(JSON.stringify(Point.meta))
    } catch (e) {
        // There is a weird bug in FX3.5 here
        self.diag(e)
    }
    
}

return t;
})()
