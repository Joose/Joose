Module("block.ui.role", function () {
    Role("Group", {
        does: [
            block.ui.role.Draggable,
            block.ui.role.Focusable,
            block.ui.role.ShapeUI
        ],
        before: {
            destroy: function () {
                Joose.A.each(this.getElements(), function (shape) { shape.destroy() })
            },
            touch: function () {
                Joose.A.each(this.getElements(), function (shape) { shape.touch() })
            }
        },
        after: {
            draw: function () {
                var me   = this;
                var left   = null;
                var top    = null;
                var right  = null;
                var bottom = null
                Joose.A.each(this.getElements(), function drawGroupEle (ele) {
                    var myTop = ele.top();
                    if(top == null || myTop < top) {
                        top = myTop
                    }
                    var myLeft = ele.left();
                    if(left == null || myLeft < left) {
                        left = myLeft
                    }
                    var myRight = ele.right();
                    if(right == null || myRight > right) {
                        right = myRight
                    }
                    var myBottom = ele.bottom();
                    if(bottom == null || myBottom > bottom) {
                        bottom = myBottom
                    }
                })
                if(left != null && top != null && right != null && bottom != null) {
                    
                    this.x(left);
                    this.y(top);
                    this.width(right - left)
                    this.height(bottom - top)
                    
                    var dontMoveChildren = true
                    this.updateState(dontMoveChildren)
                }
            }
        },
        
        override: {
            updateState: function (dontMoveChildren) { // evil hack para to avoid movement ruding initialization
                var beforeLeft = this.getLeft();
                var beforeTop  = this.getTop();
                
                this.SUPER();
                
                if(!dontMoveChildren) {
                
                    var afterLeft  = this.getLeft();
                    var afterTop   = this.getTop();
                
                    var deltaLeft  = afterLeft - beforeLeft;
                    var deltaTop   = afterTop  - beforeTop;
                
                    if(deltaLeft == 0 && deltaTop == 0) { // we didnt really move :)
                        return
                       }
                
                       Joose.A.each(this.getElements(), function updateChild (ele) {
                    
                        ele.x(ele.left() + deltaLeft)
                        ele.y(ele.top() + deltaTop)
                        if(ele.meta.can("dragComplete")) {
                            ele.redraw()
                        }
                        ele.updateState()
                    })
                }
            }
        },
        
        methods: {
            create: function () {
                return jQuery("<div class='group shape'></div>")
            },
            
            focus: function () {
                this.$.show()
            },
            
            blur: function () {
                this.$.hide()
            }
        }
    })
})