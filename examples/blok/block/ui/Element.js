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
            },
            
            redrawTimeout: {
            	persistent:   false
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
            
            // call this to make sure you only redraw once in a mass redraw of shapes
            asyncRedraw: function () {
            	if(this.redrawTimeout) {
            		clearTimeout(this.redrawTimeout)
            	}
            	var me = this;
            	this.redrawTimeout = setTimeout(function asyncRedrawCallback () {
            		me.redraw()
            	}, 0)
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
