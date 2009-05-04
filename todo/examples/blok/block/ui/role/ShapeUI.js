Module("block.ui.role", function () {
    Role("ShapeUI", {
        requires: [],
        after: {
            place: function () {
                var me = this;
                this.$.contextMenu('ShapeContextMenu', {
                    bindings: {
                        ctDelete: function () {
                            me.destroy()
                        },
                        ctCopy: function () {
                            document.manager.copy(me)
                        },
                        ctBringToFront: function () {
                            me.zIndex(document.manager.nextZIndex())
                        },
                        ctAsGroup: function () {
                            if(!me.meta.isa(block.ui.shape.SelectionGroup)) {
                                alert("selection must be selection group")
                                return
                            }
                            var group = me.asRealGroup();
                            document.shapes.addAndDraw(group)
                            document.manager.switchFocus(group)
                        },
                        
                        ctUnGroup: function () {
                            alert("not implemented")
                        }
                    }
                })
            }
        }
    })
})