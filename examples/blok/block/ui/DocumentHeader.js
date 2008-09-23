Module("block.ui", function (m) {
    
    var userId = Math.random();
    
    var defaultTitle = "Untitled Document";
    
    Class("DocumentHeader", {
        does: [Joose.Storage],
        has: {
            title: {
                is:   "rw"
            },
            user: {
                is:   "rw",
                init: function () { return document.location.search ? document.location.search : userId  }
            }
        },
        
        methods: {
        	touch: function () {
        		document.manager.setDirty(true);
        		document.sync.saveState()
        	},
        	
        	// Need this extra method, because setTitle is also called upon initialization
        	changeTitle: function (title) {
        		this.setTitle(title);
        		this.touch()
        	},
        	
        	isDefaultTitle: function () {
        		return this.getTitle == defaultTitle
        	}
        },
        
        after: {
            
            initialize: function () {
                this.setTitle(defaultTitle)
            },
            
            setTitle: function () {
                document.title = (""+this.getTitle() + " - blok");
                $('#documentTitle').html(this.getTitle().html())
            }
        }
    })
})