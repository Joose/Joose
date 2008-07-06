Module("block.ui", function (m) {
    Class("Document", {
        does: [Joose.Storage],
        has: {
               header: {
                is:   "rw",
                init: function () { return new block.ui.DocumentHeader() }
            },
               body: {
                is: "rw"
            },
            id: {
                is: "rw",
                init: function () {
                    var id = document.paras.docId
                    if(id != null && id != "") {
                        return id
                    }
                    return "default"
                }
            }
        },
        methods: {
            getUser: function () {
                return this.getHeader().getUser()
            }
        }
    })
})