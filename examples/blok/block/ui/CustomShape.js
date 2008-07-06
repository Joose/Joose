Module("block.ui", function (m) {
    Class("CustomShape", {
        does: [Joose.Storage],
        has: {
            _html: {
                is: "rw",
                init: ""
            },
            _name: {
                is: "rw",
                init: "CustomShape"
            }
        }
    })
})
