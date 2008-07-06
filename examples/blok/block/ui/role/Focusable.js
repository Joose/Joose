Module("block.ui.role", function () {
    Role("Focusable", {
        after: {
            place: function () {
                var me = this;
                this.$.mousedown(function mousedown () {
                    document.manager.switchFocus(me)
                })
            },
            
            focus: function () {
                this.$.addClass("focus")
            },
            
            blur: function () {
                this.$.removeClass("focus")
            }
        }
    })
})