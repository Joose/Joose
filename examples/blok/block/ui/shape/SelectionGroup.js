Module("block.ui.shape", function (m) {
    Class("SelectionGroup", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Group
        ],
        methods: {

            propagate: function () {},
            
            touch: function () {
                // we are just a selection
                // Touching ourselves should not make the document dirty 
                
                this.updated()
            },
            
            paste: function (target) {
                
                // add only my elements to the target because I am just a transient group
                Joose.A.each(this.getElements(), function (ele) {
                    ele.paste(target)
                })
                
                this.draw();
                this.redraw();
                
                document.manager.asyncSwitchFocus(this)
            },
            
            css: function (key, value) {
                var args = arguments
                if(value != null) {
                    Joose.A.each(this.getElements(), function (shape) {
                        shape.css.apply(shape, args)
                    })
                }
                return ""
            },
            
            asRealGroup: function () {
                var group = new block.ui.shape.Group();
                Joose.A.each(this.getElements(), function (ele) {
                    group.add(ele);
                })
                return group
            }
        }
    });
});
