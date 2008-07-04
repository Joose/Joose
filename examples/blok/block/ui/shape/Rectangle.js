Module("block.ui.shape", function (m) {
    Class("Rectangle", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Draggable, 
            block.ui.role.Resizable, 
            block.ui.role.Focusable,
            block.ui.role.Editable,
            block.ui.role.ShapeUI,
            block.ui.role.Stylable,
            block.ui.role.Connectable
        ],
        has: {
            _text: {
                is:   "rw",
                init: ""
            }
        },
        methods: {
            create: function () {
                return jQuery("<div class='rectangle shape stylable'><table width=100% height=100%><tr><td valign=center align=center class='textField stdText stylable'></td></tr></table></div>")
            }
        }
    });
})