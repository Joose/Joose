Module("block.ui.shape", function (m) {
    
    Class("DragPoint", {
        isa:  block.ui.Shape,
        does: block.ui.role.Draggable,    
        has: {
            xMethod: {
                is: "rw"
            },
            yMethod: {
                is: "rw"
            }
        },
        methods: {
            
            create: function () {
                return jQuery("<div class='dragPoint shape'></div>")
            },
            redraw: function () {
                this.center(this.getContainer()[this.getXMethod()](), this.getContainer()[this.getYMethod()]())
            },
            dragHandler: function () {
                var me = this;
                return function (e) {
                    var self = me;
                    me.getContainer()[me.getXMethod()](Math.round(me.left() + me.width() / 2))
                    me.getContainer()[me.getYMethod()](Math.round(me.top() + me.height() / 2))
                    me.getContainer().redraw()
                    return false
                }
            }
        }
    })
})