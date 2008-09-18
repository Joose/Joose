Module("block.ui", function (m) {
    
    Class("CustomShapeBody", {
        does: [Joose.Storage],
        has: {
            _html: {
                is: "rw",
                init: ""
            },
            _name: {
                is: "rw",
                init: "CustomShape"
            },
            _url: {
                is: "rw"
            },
            _roles: {
                is: "rw",
                init: function () { return [] }
            },
            _description: {
                is: "rw",
                init: ""
            }
        },
        
        methods: {
            getId: function () {
                return this.getUrl() + "/" + this.getName()
            }
        },
        
        override: {
            //allow a style declarion like height:20blok to autosize a shape to our grid size
            getHtml: function () {
                var html = this.SUPER();
                var match;
                while(match = html.match(/(\d+)\s*blok/)) {
                    var n = parseInt(match[1]) * 20;
                    html  = html.replace(/(\d+)\s*blok/, ""+n+"px")
                }
                return html
            }
        }
    });
    
    Class("CustomShapeManager", {
        
        has: {
            _shapeBodies: {
                is: "rw",
                init: function () { return {} }
            }
        },
        
        methods: {
            fetch: function (url) {
                var me = this;
                block.ui.SyncDocument.request("GET", url, null, function shapesFetched (data) {
                    Joose.O.each(data, function (body, key) {
                        body.setUrl(url);
                        var id              = body.getId();
                        me.setBody(body)
                        var h = $('<li><a href="#">'+body.getName()+'</li>');
                        h.click(function () { me.drawShape(id) })
                        $('#customShapes').append(h)
                    })
                })
            },
            
            getBody: function (id) {
                return this.getShapeBodies()[id]
            },
            
            setBody: function (body) {
                this.getShapeBodies()[body.getId()] = body
            },
            
            
            drawShape: function (id) {
                
                var body  = this.getBody(id)
                
                var shape = new block.ui.shape.Custom({
                    body: body
                });
                document.shapes.addAndDraw(shape)
            }
        }
    });
})
