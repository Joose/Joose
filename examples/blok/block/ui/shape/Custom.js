Module("block.ui.shape", function (m) {
    
    
    Class("Custom", {
        isa:  block.ui.Shape,
        has: {
            _body: {
                is: "rw"
            },
            _text: {
                is:   "rw",
                init: ""
            }
        },
        before: {
            draw: function () {
                this.updateBody()
                this.applyRoles()
            }
        },
        methods: {
            
            updateBody: function () {
                var cur = document.customShapes.getBody(this.getBody().getId())
                if(cur && cur !== this.getBody()) {
                    this.setBody(cur);
                        if(this.$) {
                        this.$.remove();
                        this.placed = false;
                    }
                }
                
            },
            
            // override to ignore changed name through runtime role application
            packedClassName: function () {
                return "block::ui::shape::Custom"
            },
            
            applyRoles: function () {
                var me      = this;
                var strings = this.getBody().getRoles();
                Joose.A.each(strings, function (s) {
                    var name = "block.ui.role."+s
                    var role = me.meta.classNameToClassObject(name);
                    role.meta.apply(me)
                })
            },

            create: function () {
                   var ele = jQuery(this.getBody().getHtml());
                   ele.addClass("shape");
                   ele.addClass("baseSize");
                   return ele
            },
            
            type: function () {
                return this.getBody().getName()
            }
        }
    });
})