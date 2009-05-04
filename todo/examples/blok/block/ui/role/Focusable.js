Module("block.ui.role", function () {
    Role("Focusable", {
        after: {
            place: function () {
                var me = this;
                this.$.mousedown(function focusClick (e) {
                    e.preventDefault()
                    document.manager.switchFocus(me, e.shiftKey)
                    return false;
                })
            },
            
            focus: function () {
                this.$.append('<div class="focusDiv"></div>')
            },
            
            blur: function () {
                this.$.find(".focusDiv").remove()
            }
        }
    })
})