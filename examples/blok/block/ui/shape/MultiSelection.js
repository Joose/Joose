Module("block.ui.shape", function (m) {
    Class("MultiSelection", {
        isa:  block.ui.Shape,
        does: [],
        methods: {
            create: function () {
                return jQuery("<div class='multiSelection shape'></div>")
            },
            
            touch: function () {
                // we are just a selection
                // Touching ourselves should not make the document dirty 
                
                this.updated()
            },
            
            selectContained: function () {
                var top    = this.$.offset().top
                var left   = this.left();
                var right  = this.right();
                var bottom = top + this.height()
                
                var group  = new block.ui.shape.SelectionGroup();
                var found  = false;
                
                document.shapes.traverse(function (shape) {
                	try {
                    	if(!shape.getDeleted() && shape.meta.does(block.ui.role.Focusable)) {
                    	    if(shape.top()    >= top &&
                    	       shape.left()   >= left &&
                    	       shape.right()  <= right &&
                    	       shape.bottom() <= bottom
                    	      ) {
                    	        group.add(shape);
                    	        found = true;
                    	    }
                    	}
                	} catch(e) {
                		console.log(e)
                	}
                })
                
                if(found) {
                    group.draw()
                    group.redraw();
                    document.manager.switchFocus(group)
                } else {
                    document.manager.clearFocus()
                }
            }
        }
    });
})