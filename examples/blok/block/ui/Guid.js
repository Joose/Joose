Module("block.ui", function () {
	
	var GuidCounter = 0;
	
	Class("Guid", {
		has: {
			id:{}
		},
		
		methods: {
			toString: function () {
				return ""+this.id
			}
		},
		
		classMethods: {
			
			// initializes hash for storing transformed Guids during a replace session
			startReplaceSession: function () {
				this.substitution = {};
			},
			
			// reset guids in a shapes and its childs. Make sure connections stay connected
			replaceGuids: function (shape) {
				
				var me = this;
				
				var shapes       = [shape];
                shape.traverse(function (shape) {
                    shapes.push(shape)
                })
                
                // replace all guids of shapes
                Joose.A.each(shapes, function (s) {
                	var before = shape.getGuid();
                	var after  = shape.resetGuid();
                	
                	me.substitution[before] = after;
                })
                
                // reassign connections
                Joose.A.each(shapes, function (s) {
                	if(s.meta.isa(block.ui.shape.Connection)) {
                		var origin = me.substitution[s.getOriginGuid()];
                		s.setOriginGuid(origin)
                		var dest   = me.substitution[s.getDestinationGuid()];
                		s.setDestinationGuid(dest)
                	}
                })
			},
			
			create: function () {
                return document.paras.guidBase + "-" + GuidCounter++
			}
		}
	})
})