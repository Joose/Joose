plan(0);

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

diag(JSON.stringify(Point.meta))

endTests()

