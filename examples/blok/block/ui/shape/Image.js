Module("block.ui.shape", function (m) {
    Class("Image", {
        isa:  block.ui.Shape,
        has: {
        	_imageUrl: {
        		is: "rw",
        		init: "/static/pony.jpg"
        	}
        },
        does: [
            block.ui.role.Draggable, 
            block.ui.role.Resizable, 
            block.ui.role.Focusable
        ],
        after: {
            place: function () {
                var me = this;
                this.$.dblclick(function () {
                	var url = prompt("Please enter an image URL:", me.getImageUrl());
                	if(url) {
                    	me.imageUrl(url);
                    	me.updateState()
                	}
                })
                
                this.imageUrl(this.getImageUrl())
                
                this.resizeImage()
            },
            
            _updateFromCore: function (shape) {
                this.imageUrl(shape.getImageUrl())
                this.resizeImage()
            },
            
            _updateStateCore: function () {
                this.setImageUrl(this.imageContainer().find("img").attr('src'));
                this.resizeImage()
            }
            
        },
        methods: {
        	
        	resizeImage: function () {
        		var img = this.imageContainer().find("img");
        		img.width(this.getWidth())
        		img.height(this.getHeight())
        	},
            
            imageUrl: function (url) {
                if(arguments.length > 0) {
                	// rerender to get new size
                    this.imageContainer().html("<img class='image' src='"+url+"' />")
                }
                return this.getImageUrl()
            },
            
            imageContainer: function () {
                return this.$.find("div div")
            },
        

            create: function () {
                return jQuery("<div class='shape'><div><div></div></div></div>")
            },
            
            dim$: function () {
            	return this.$
            },
            
            resize$: function () {
            	return this.$
            }
        }
    });
})