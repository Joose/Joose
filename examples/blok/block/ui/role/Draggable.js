Module("block.ui.role", function () {
    Role("Draggable", {
        methods: {
            makeDraggable: function () {
                var me     = this;        
                this.$.draggable({
                    //drag: onDrag,
                    stop: function () { me.dragComplete(); },
                    grid: document.grid.jQueryGridParameter()
                })
            },
            dragComplete: function () {
                this.updateState()
                this.redraw();
            }
        }
    })
})