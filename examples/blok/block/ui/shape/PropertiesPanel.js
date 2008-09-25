Module("block.ui.shape", function (m) {
    
    var refreshTimeout;
    
    Class("PropertiesPanel", {
        isa: block.ui.Shape,
        has: {
            _shape: {
                is: "rw"
            },
            
            _openEdit: { // stores an edit action that gets executed if there wasnt an event before a change of shape
                is: "rw"
            }
        },
        methods: {
            
            // Warning ugly:
            // ele must be an input or select
            // ele.id must me a method name or a methodName-firstPara
            callProp: function (ele, shape, value) {
                
                var $ele = $(ele);
                
                var id    = ele.id
                 var parts = id.substr(4).split("-");
                 var prop  = parts[0];
                 var optionalPara = parts[1];
                 var paras = [];
                 if(optionalPara) {
                     paras.push(optionalPara)
                 }
                 if(arguments.length > 2) {
                     var val = "" + value;
                     
                     if($ele.attr("addPx")) {
                         val += "px"
                     }
                     paras.push(val)
                 }
                 var does = $ele.attr('jooseDoes');
                 if(shape.meta.can(prop) && (!does || shape.meta.does(shape.meta.classNameToClassObject(does))) ) {
                     ele.disabled = false;
                     var val = shape[prop].apply(shape, paras);
                     if(val != null) {
                         if($ele.attr("addPx")) {
                             val = val.replace(/px/, "")
                         }
                         return val
                     } else {
                         return ""
                     }
                 } else {
                     ele.disabled = true;
                     return "n/a"
                 }
            },
            
            handleChange: function (input, shape) {
                var me = this;
                if(shape) {
                    me.setOpenEdit(null);
                    document.undo.addUpdateStep(shape)
                    me.callProp(input, shape, $(input).val())
                    shape.touch()
                }
            },
            
            place: function () {
                var me = this;
                
                this.$  = $("#properties");
                
                this.redraw()
                
                // Update property on change of input field or select box
                this.$.find("#shapeProperties input,#shapeProperties select").each(function () {
                    $(this).change(function () {
                        me.handleChange(this, me.getShape())
                    })
                })
                
                // if we have a keypress event on an input, we will interpret this as a change if
                // there is no onchange event, but we change shapes
                this.$.find("#shapeProperties input").each(function () {
                    $(this).keypress(function () {
                        
                        var input = this;
                        var shape = me.getShape()
                        
                        me.setOpenEdit(function () {
                            me.handleChange(input, shape)
                        })
                    })
                })
            },
            
            show: function () {
                $('#shapeProperties').show()
                $('#documentProperties').hide()
                this.redraw()
            },
            
            hide: function () {
                this.executeOpenEdit()
                $('#shapeProperties').hide()
                $('#documentProperties').show()
                this.redraw()
            },
            
            executeOpenEdit: function () {
                var edit = this.getOpenEdit();
                if(edit) {
                    edit()
                    this.setOpenEdit(null)
                }
            },
            
            setShape: function (newEle) {
                this.executeOpenEdit()
                this._shape = newEle
                this.refresh(newEle);
                this.show()
            },
            
            refresh: function (shape) {
                
                if(refreshTimeout) {
                    clearTimeout(refreshTimeout)
                }
                
                var me = this;
                
                // fill in values from newly assigned shape
                refreshTimeout = setTimeout(function () {
                    if(shape === me.getShape()) {
                        $('#shapeType').html(shape.type())
                        me.$.find("#shapeProperties input, #shapeProperties select").each(function () {
                            $(this).val(me.callProp(this, shape))
                        })
                        $.colorPicker.refreshSamples()
                        }
                }, 0)
            },
            
            redraw: function () {
                var height = this.$.height();
                this.$.css("top",""+($(window).height() - height - 20) + "px"); // 10 is padding
                this.$.css("width", ""+($(window).width() - 150)  + "px"); // FIXME get rid of constants
            }
        }
    })
})