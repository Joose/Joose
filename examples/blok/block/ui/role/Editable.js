// XXX Refactor to elimate updateState (directly set upon action)
Module("block.ui.role", function () {
    Role("Editable", {
        requires: ["getText", "setText", "_updateStateCore", "touch", "_updateFromCore", "updateState"],
        after: {
            place: function () {
                var me = this;
                this.$.dblclick(function () {
                    me.text(prompt("Please enter Text", me.textContainer().text()));
                    me.updateState()
                })
                
                me.text(this.getText())
            },
            
            _updateFromCore: function (shape) {
                this.text(shape.getText())
            },
            
            _updateStateCore: function () {
                this.setText(this.textContainer().text());
            },
            
            redraw: function () {
                 this.textContainer().text(this.getText())
            }
        },
        methods: {
            
            text: function (t) {
                if(arguments.length > 0) {
                    this.textContainer().text(new String(t).html())
                }
                return this.getText()
            },
            
            textContainer: function () {
                return this.$.find(".textField")
            }
        }
    })
})