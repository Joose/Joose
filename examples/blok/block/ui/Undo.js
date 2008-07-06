Module("block.ui", function (m) {
    Class("Undo", {
        has: {
            _steps: {
                is: "rw",
                init: function () { return [] }
            }
        },
        
        methods: {
            
            undo: function () {
                var last = this._steps.pop();
                if(last) {
                    last()
                }
            },
            
            addUndoStep: function (step, shape) {
                if(!shape.meta.does(block.ui.role.Group)) { // refactor to not even add this
                    console.log("Add Undo step")
                    this._steps.push(step);
                    
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