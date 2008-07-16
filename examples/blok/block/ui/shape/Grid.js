Module("block.ui.shape", function (m) {
    Class("Grid", {
        isa: block.ui.Shape,
        has: {
            distance: {
                is:   "rw",
                init: 20
            },
            color: {
                is: "rw",
                init: "#CCCCCC"
            },
            
            multiSelection: {
                is: "rw"
            }
        },
        methods: {
            place: function () {
                var me       = this;
                
                this.$       = $("#grid");
                
                var offsetLeft = this.getOffsetLeft();
                var offsetTop  = this.getOffsetTop()
                
                var d        = this.getDocument();
                var width    = d.width()  - offsetLeft
                var height   = d.height() - offsetTop
                var distance = this.getDistance();
                var color    = this.getColor()
                var html     = "";
                for(var i = 0; i < width; i += distance) {
                    html += '<div style="position:absolute; top: 0px; left: '+i+'px; width: 1px; height: '+height+'px"></div>\n'
                }
                for(var i = 0; i < height; i += distance) {
                    html += '<div style="position:absolute; top: '+i+'px; left: 0px; width: '+width+'px; height: 1px"><img src="/static/t.gif" width=1 height=1 /></div>\n'
                }
                
                this.$.append(html)
                
                this.$.width(width);
                this.$.height(height);
                
                
                
                this.$.click(function () {
                    document.manager.clearFocus()
                })
                
                
                //FIXME IE support für die MultiSelection
                if(document.all) {
                	return
                }
                
                var start;
                
                // events for multi selection
                this.$.mousedown(function (e) {
                	e.preventDefault()
                	
                    var multi = new block.ui.shape.MultiSelection();
                    multi.draw()
                    multi.redraw()
                    start = e;
                    var baseX = e.pageX - offsetLeft
                    multi.x(baseX);
                    multi.y(e.pageY - offsetTop);
                    multi.width(1);
                    multi.height(1);
                    me.setMultiSelection(multi)
                    
                    var win = $(window);
                    
                    var redrawMulti = function (multi, e) {
                          
                          var deltaX = e.pageX - start.pageX;
                          var deltaY = e.pageY - start.pageY;
                          
                          if(deltaX < 0) {
                              multi.left(e.pageX - offsetLeft);
                              multi.width(deltaX * -1)
                          } else {
                              multi.width( deltaX );
                          }
                          
                          if(deltaY < 0) {
                              multi.top(e.pageY - offsetTop);
                              multi.height(deltaY * -1)
                          } else {
                              multi.height( deltaY );
                          }
                          
                    }
                    
                    var mousemove = function (e) {
                        if(me.getMultiSelection()) {
                            redrawMulti(me.getMultiSelection(), e)
                        }
                    }
                
                    win.mousemove(mousemove)
                
                    win.one("mouseup", function (end) {
                    	win.unbind("mousemove", mousemove)
                        var sel = me.getMultiSelection();
                        if(sel) {
                            redrawMulti(sel, end)
                            sel.selectContained()
                            sel.destroy()
                        }
                        me.setMultiSelection(null)
                        return true
                    })
                    
                    
                    return true
                })
                
                
                
            },
            
            redraw: function () {
                this.placed = false
                this.$.html("")
                this.draw()
            },
            
            jQueryGridParameter: function () {
                return [this.getDistance(), this.getDistance()]
            }
        }
    })
})