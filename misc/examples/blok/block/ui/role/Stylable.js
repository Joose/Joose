Module("block.ui.role", function () {
    Role("Stylable", {
        requires: ["getStyle", "setStyle"],
        
        after: {
            
            initialize: function () {
                if(this.getStyle() == null) {
                    this.setStyle({})
                }
            },
            
            draw: function () {
                this.drawCSS()
            },
            
            redraw: function () {
                this.drawCSS()
            },
            
            _updateFromCore: function (shape) {
                var before = this.getStyle()
                this.setStyle(shape.getStyle())
                this.drawCSS(before)
            }
        },
        methods: {
            
            drawCSS: function (before) {
                var me    = this;
                var style = this.getStyle()
                
                Joose.O.each(style, function eachCss (value, name) {
                    if(!before || before[name] != value) {
                        me.css(name, value)
                    }
                })
            },
            
            css: function (key, value) {
                if(arguments.length > 1) {
                    this.$.css(key, value)
                    this.$.find(".stylable").css(key, value)
                    this.getStyle()[key] = value
                }
                return this.getStyle()[key]
            }
        }
    })
})