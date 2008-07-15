Module("block.ui", function (m) {
    Class("Container", {
        isa: block.ui.Element,
        has: {
            elements: {
                is: "rw",
                init: function () { return [] }
            }
        },
        after: {
            draw: function () {
                Joose.A.each(this.getElements(), function drawEach (ele) {
                    ele.draw()
                })
            }
        },
        methods: {
            
            traverse: function (func, depth, seen) {
                var me       = this
                var seenHash = seen
                if(!seenHash) {
                    seenHash = {};
                }
                myDepth = depth
                if(!myDepth) {
                    myDepth = 0
                }
                
                var eles = this.getElements();
                for(var i = 0; i < eles.length; i++) {
                	var ele = eles[i];
                	var guid = ele.getGuid()
                    if(!seenHash[guid]) {
                        seenHash[guid] = true
                        func(ele, me, myDepth)
                        ele.traverse(func, myDepth+1, seenHash)
                    }
                }
            },
            
            prettyPrint: function() {
                var html = "<ul>\n"
                var me   = this;
                Joose.A.each(this.getElements(), function (ele) {
                    html += "<li>"+ele+"\n<ul>\n"
                    var fields = ["getGuid", "getLeft", "getWidth", "getHeight", "getTop", "getText", "getDeleted"]
                    Joose.A.each(fields, function (field, i) {
                        if(ele.meta.can(field)) {
                            html += "<li>"+fields[i]+": "+ ele[field]() +"</li>"
                        }
                    })
                    html += "</ul>\n"
                    html += ele.prettyPrint()+"</li>\n"
                })
                html += "</ul>\n"
                
                return html
            },
            
            redraw: function () {
                Joose.A.each(this.getElements(), function redrawEach (ele) {
                    ele.redraw()
                })
            },
            add: function (ele) {
                this.getElements().push(ele)
                this.propagate(ele)
            },
            
            removeElement: function (ele) {
                var elements = [];
                Joose.A.each(this.getElements(), function (cur) {
                    if(ele !== cur) {
                        elements.push(cur)
                    }
                })
                this.setElements(elements)
            },
            
            propagate: function (ele) {
                ele.setContainer(this)
                ele.setDocument(this.getDocument())
                ele.setViewPort(this.getViewPort())
            },
            
            finishUnpack: function () {
                var me = this;
                Joose.A.each(this.getElements(), function finishUnpackEach (ele) {
                    me.propagate(ele)
                })
            },
            addAndDraw: function (ele) {
                this.add(ele);
                this.draw();
                this.redraw();
            }
        }
    })
})