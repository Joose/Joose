Module("block.ui", function (m) {
    Class("User", {
        
        has: {
            id: {
                is: "rw",
                init: document.paras.userName
            }
        },
        
        methods: {
            loggedIn: function () {
                return document.paras.userName != "";
            },
            
            login: function (action) {
                var after = window.location.href;
                after.replace(/#.+/, "");
                after += "&action="+action
                window.location.href = "/login?continue="+encodeURIComponent(after)
            },
            
            saveCurrentDocument: function () {
                if(this.loggedIn()) {
                    // make sure we saved this at least once
                    document.manager.setDirty(true);
                    document.sync.saveState();
                    block.ui.SyncDocument.request("GET", "/save", { hash: document.paras.docId }, function saved (template) {
                        alert("The document was successfully saved.")
                    });
                } else {
                    this.login("save");
                }
            },
            
            loadDocuments: function (callback) {
                if(this.loggedIn()) {
                    block.ui.SyncDocument.request("GET", "/documents", null, function fetchDocuments (documents) {
                        callback(documents)
                    });
                } else {
                    this.login("open")
                }
                
            }
        }
        
    })
})