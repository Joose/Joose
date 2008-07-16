Module("block.ui.role", function () {
    Role("Focusable", {
        after: {
            place: function () {
                var me = this;
                this.$.click(function focusClick (e) {
                	e.preventDefault()
                    document.manager.switchFocus(me, e.shiftKey)
                    return false;
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