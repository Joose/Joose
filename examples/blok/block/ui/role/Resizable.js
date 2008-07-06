Module("block.ui.role", function () {
    Role("Resizable", {
        requires: ["getMinWidth", "getMinHeight"],
        after: {
            place: function () {
                this.makeResizable()
            }
        },
        methods: {
        	
        	makeResizable: function () {
        		var me = this;
                this.resize$().resizable({
                    handles:   'all',
                    autoHide:  true,
                    proxy:     false,
                    minHeight: me.getMinHeight(),
                    minWidth:  me.getMinWidth(),
                    aspectRatio: this.maintainAspectRatio() ? "preserve" : null,
                    stop:        function onResize () { me.onResize() },
                    grid:        document.grid.jQueryGridParameter()
                })
        	},
        	
            maintainAspectRatio: function () {
                return document.manager.shiftKeyDown()
            },
            resize$: function () {
                return this.$
            },
            onResize: function () {
                this.updateState()
            }
        }
    })
})