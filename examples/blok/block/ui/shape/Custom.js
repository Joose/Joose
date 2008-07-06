Module("block.ui.shape", function (m) {
    Class("Custom", {
        isa:  block.ui.Shape,
        has: {
            _shapeUrl: {
                is: "rw",
                init: ""
            },
            _customShape: {
                is: "rw",
                persistent: false
            },
            _text: {
                is:   "rw",
                init: ""
            }
        },
        does: [
            block.ui.role.Draggable, 
            block.ui.role.Resizable, 
            block.ui.role.Focusable,
            block.ui.role.Editable,
            block.ui.role.ShapeUI,
            block.ui.role.Stylable
        ],
        after: {
            place: function () {
                this.shapeUrl(this.getShapeUrl());
                
                this.fetchAndDraw()
            },
            
            _updateFromCore: function (shape) {
                this.shapeUrl(shape.getShapeUrl())
            },
            
            _updateStateCore: function () {
            }
            
        },
        methods: {
            
            fetchAndDraw: function () {
                var me = this;
                
                jQuery.getJSON(this.getShapeUrl(), function shapeFetched (data) {
                    var customShape = Joose.Storage.Unpacker.unpack(data)
                    me.setCustomShape(customShape)
                    me.renderCustomShape()
                })
            },
            
            renderCustomShape: function () {
                this.html$().html(this.getCustomShape().getHtml());
                this.redraw()
            },
            
            shapeUrl: function (url) {
                if(arguments.length > 0) {
                    if(url != this.getShapeUrl()) {
                        this.setShapeUrl(url);
                        this.fetchAndDraw();
                    }
                }
                return this.getShapeUrl()
            },
            
            html$: function () {
                return this.$.find("div div")
            },

            create: function () {
                return jQuery("<div class='shape baseSize'><div><div></div></div></div>")
            }
        }
    });
})