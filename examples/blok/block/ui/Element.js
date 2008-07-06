Module("block.ui", function (m) {
    Class("Element", {
        meta: block.ui.ElementMetaclass,
        does: [Joose.Storage, block.ui.role.Notification],
        has: {
            container: {
                is:         "rw",
                persistent: false
            },
            $: {
                is:         "rw",
                persistent: false
            },
            document: {
                is:         "rw",
                init:       function () { return $(document) },
                persistent: false
            },
            viewPort: {
                is:         "rw",
                init:       function () { return document.manager.getViewPort() },
                persistent: false
            },
            placed: {
                is:         "rw",
                init:       false,
                persistent: false
            },
            listener: {
                is:            "rw",
                init:        function () { return [] },
                persistent: false
            },
            
            deleted: {
                is:            "rw",
                init:        false
            }
        },
        methods: {
            
            isDeleted: function () {
                return this.deleted
            },
            
            getGuid: function () { // override for real Guids, See Shape.js
                return 0
            },
            
            place: function () {},
            draw: function () {
                if(!this.placed && !this.deleted) {
                    this.placed = true
                    this.place()
                }
            },
            
            redraw: function () {},
            
            focus: function () {},
            blur:  function () {},
            
            isSelectionGroup: function () {
                return false
            }
        }
    })
})
