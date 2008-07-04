var c0, c1
function testConnection() {
	if(!c0) {
		c0 = new block.ui.shape.Connection();
	}
	
	if(!c1) {
		c1 = new block.ui.shape.Connection();
	}
	
	var shapes = document.shapes.getElements();
	c0.connect(shapes[0], shapes[1])
	c1.connect(shapes[0], shapes[2])
}

Module("block.ui.shape", function (m) {
	
	
	Class("Connector", {
		classMethods: {
			
			connectFocused: function () {
				var shapes = document.manager.getFocusElement();
				if(!shapes) {
					alert("Please select at least two shapes.")
				} else {
					if(shapes.meta.does(block.ui.role.Group)) {
						this.connect(shapes.getElements())
					} else {
						alert("Please select multiple shapes.")
					}
				}
			},
			
			connect: function (shapes) {
				
				var dests  = [];
				var origin = shapes[0];
				if(origin) {
					Joose.A.each(shapes, function (shape) {
						if(shape.meta.does(block.ui.role.Connectable)) {
							if(origin && origin.center().top > shape.center().top) {
								origin = shape;
							}
							dests.push(shape)
						}
					})

					dests = Joose.A.remove(dests, origin)
					
					Joose.A.each(dests, function (dest) {
						var connection = m.Connection.addToDoc({
							origin:      origin,
							destination: dest
						})
						connection.draw()
						
						document.shapes.add(connection)
					})
				}
			}
		}
	})
	
	Class("Connection", {
		isa:  block.ui.Shape,
		
		does: [
			block.ui.role.Focusable
		],
		
		has: {
			_verticals: {
				is: "rw",
				persistent: false,
				init: function () { return [new m.VerticalLine(), new m.VerticalLine()] }
			},
			_horizontals: {
				is: "rw",
				persistent: false,
				init: function () { return [new m.HorizontalLine()] }
			},
			_origin: {
				is: "rw",
				persistent: false
			},
			_destination: {
				is: "rw",
				persistent: false
			},
			_originGuid: {
				is: "rw"
			},
			_destinationGuid: {
				is: "rw"
			}
		},
		
		
        methods: {
        	
        	changeNode: function (curNode, newNode) {
        		if(curNode) {
        			curNode.removeListener(this)
        		}
        		newNode.addListener(this)
        	},
        	
        	notify: function (shape) {
        		console.log("redraw connection")
        		if(shape.isDeleted() && !this.isDeleted()) {
        			this.destroy()
        		} else {
        			this.redraw()
        		}
        	},
        	
        	place: function () {
        		this.redraw()
        	},
        	
        	redraw: function () {
        		if(!this.isDeleted()) {
        			this.connect(this.getOrigin(), this.getDestination())
        		}
        	},
        	
        	/* This currently implements a simple connection strategy based on 3 lines */
        	/* and should later be refactored to allow for different connection strategires. */
        	connect: function (shape1, shape2) {
        		var orig = shape1;
        		var dest = shape2;
        		
        		var origBottom = orig.bottom()      
        		var destTop    = dest.top()
        		
        		if(orig.top() > destTop) {
        			// reverse origin and destination
        			orig = shape2
        			dest = shape1
        			
        			origBottom = orig.bottom()
        			destTop    = dest.top()
        		}
        		
        		var origCenter = orig.center();
        		var destCenter = dest.center();
        		
        		var v0 = this.getVerticals()[0];
        		var v1 = this.getVerticals()[1];
        		var h0 = this.getHorizontals()[0];
        		
        		v0.draw()
        		v0.y(origBottom + 1)
        		v0.x(origCenter.left)
        		
        		var vlen = (destTop - origBottom) / 2;
        		
        		v0.len(vlen);
        		
       			var hlen = destCenter.left - origCenter.left;
       			
       			h0.draw()
       			h0.y(origBottom + vlen);
       			h0.x(origCenter.left)
       			h0.len(hlen)
       			
       			v1.draw();
       			v1.y(origBottom + vlen);
        		v1.x(origCenter.left + hlen)
        		v1.len(vlen)
        		
        		if(origBottom > destTop) {
        			
        			console.log("Special case for later")
						
        			
        			v0.hide()
        			v1.hide()
        			h0.hide()
        		} else {
        			v0.show()
        			v1.show()
        			h0.show()
        		}
        	}
        },
        
        before: {
			setOrigin: function (newNode) {
				this.changeNode(this.getOrigin(), newNode);
				this.setOriginGuid(newNode.getGuid())
			},
			setDestination: function (newNode) {
				this.changeNode(this.getDestination(), newNode);
				this.setDestinationGuid(newNode.getGuid())
			},
			
			place: function () {
				if(!this.getOrigin() && this.getOriginGuid()) {
					this.setOrigin(document.manager.shapeFromGuid(this.getOriginGuid()))
				}
				if(!this.getDestination() && this.getDestinationGuid()) {
					this.setDestination(document.manager.shapeFromGuid(this.getDestinationGuid()))
				}
			}
		},
		after: {
			place: function () {
				var a = [];
				Joose.A.each(this.getVerticals(),   function (line) { a.push(line.$.get(0)) })
				Joose.A.each(this.getHorizontals(), function (line) { a.push(line.$.get(0)) })
				
				this.$ = $(a)
			}
		}
	})
	
    Class("HorizontalLine", {
        isa:  block.ui.Shape,
        does: [
            block.ui.role.Stylable
        ],
        has: {},
        methods: {
            create: function () {
                return jQuery("<div class='line horizontalLine shape'></div>")
            },
            
            getLength: function () {
            	return this.getWidth()
            },
            setLength: function (len) {
            	this.setWidth(len);
            	if(len >= 0) {
            		this.width(len)
            	} else {
            		len = Math.abs(len)
            		this.x(this.left() - len);
            		this.width(len)
            	}
            },
            
            redraw: function () {
            	this.len(this.getLength())
            },
            
            len: function (len) {
            	if(arguments.length > 0) {
            		this.setLength(len)
            	}
            	return this.width()
            }
        }
    });

    Class("VerticalLine", {
        isa:  m.HorizontalLine,
        methods: {
            create: function () {
                return jQuery("<div class='line verticalLine shape'></div>")
            },
            
            getLength: function () {
            	return this.getHeight()
            },
            setLength: function (len) {
            	this.setHeight(len);
            	if(len >= 0) {
            		this.height(len)
            	} else {
            		len = Math.abs(len)
            		this.y(this.top() - len);
            		this.height(len)
            	}
            }
        }
    });
})