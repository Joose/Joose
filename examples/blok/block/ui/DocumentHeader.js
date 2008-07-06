Module("block.ui", function (m) {
    
    var userId = Math.random();
    
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
        
        after: {
            
            initialize: function () {
                this.setTitle("Untitled Document")
            },
            
            setTitle: function () {
                document.title = ""+this.getTitle() + " - blok";
            }
        }
    })
})