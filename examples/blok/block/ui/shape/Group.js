Module("block.ui.shape", function (m) {
    Class("Group", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Group
        ],
        override: {
            add: function (ele) {
                var oldContainer = ele.getContainer();
                if(oldContainer) {
                    oldContainer.removeElement(ele)
                }
                this.SUPER(ele)
            }
        },
        
        methods: {
            blur: function () {
                this.$.addClass("groupBlurred")
            },
            focus: function () {
                this.$.removeClass("groupBlurred")
            }
        }
    });
})