Module("block.ui", function (m) {
    Class("Template", {
        has: {
            _url: {
                is: "rw"
            }
        },
        
        methods: {
            loadAndDraw: function () {
                block.ui.SyncDocument.request("GET", this.getUrl(), null, function templateFetched (template) {
                    block.ui.Guid.startReplaceSession();
                    template.paste(document.shapes)
                })
            }
        }
    })
})