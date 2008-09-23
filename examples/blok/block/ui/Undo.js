Module("block.ui", function (m) {
    Class("Undo", {
        has: {
            _steps: {
                is: "rw",
                init: function () { return [] }
            },
            
            _activeTransaction: {
            	is: "rw",
            	init: false
            }
        },
        
        methods: {
        	
        	// "Transactions" make all steps until a commit collapse into a single step
        	beginTransaction: function () {
        		if(this.getActiveTransaction()) {
        			return
        		}
        		this.addUndoStep(function emptyUndoStep () {}, block.ui.Shape)
        		this.setActiveTransaction(true);
        	},
        	
        	commit: function () {
        		this.setActiveTransaction(false);
        	},
            
            undo: function () {
                var last = this._steps.pop();
                if(last) {
                    last()
                }
            },
            
            addUndoStep: function (step, shape) {
            	if(!shape.meta.does(block.ui.role.Group)) {
                	console.log("Add Undo step: "+shape)
                
                	if(this.getActiveTransaction()) {
                		var last = this._steps.pop();
                		this._steps.push(function undoWrapper () {
                			last();
                			step();
                		});
                	} else {
                		this._steps.push(step);
                	}
                    
                	if(this._steps.length > 10) { // modulo :)
                	    this._steps.shift()
                	}
            	}
            },
            
            addUpdateStep: function (before) {
                var json = JSON.stringify(before);
                this.addUndoStep(function undoUpdate () {
                    var copy = JSON.parse(json);
                    copy.touch();
                    before.updateFrom(copy);
                    before.touch();
                }, before)
            },
            
            addCreateStep: function (shape) {
                this.addUndoStep(function undoCreate () {
                    shape.destroy()
                }, shape)
            },
            
            addDestroyStep: function (shape) {
                this.addUndoStep(function undoDestroy () {
                    console.log("Undo destroy")
                    shape.setDeleted(false);
                    shape.setPlaced(false); // so we draw again
                    shape.touch()
                    document.shapes.addAndDraw(shape);
                }, shape)
            }
        }
    })
});