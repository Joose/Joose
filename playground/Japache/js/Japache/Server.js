Module("Japache", function() {
    Class("Server", {
        
        has: {
            cometClient: {
                is: "rw"
            },
            wp: {
                is: "rw",
                required: true
            },
            config: {
                is: "rw",
                init: function () { return {} }
            },
            motherId: {
                is: "rw",
                required: true
            }
        },
        
        after: {
            initialize: function () {
                var self = this;
                this.setCometClient(new Japache.CometClient({ url: "/listen", callback: function (data) { self.handleRequest(data) } }))
            }
        },

        methods: {
            handleRequest: function (request) {
                var self      = this;
                var client    = this.getCometClient();
                var url       = request.url;
                var requestId = request.requestId;
                var count     = request.data.count;
                
                this.log("Start: "+new Date()+" - "+url + " - Request: "+requestId+" Thread "+this.config.id)
                
                if(count == "" || count == null) {
                    count = "1";
                }
                
                count = parseInt(count, 10) + 1;
                
                var html = JSON.stringify({ count: count })
                
                var response   = {
                    requestId: requestId,
                    header: "Content-Type: text/html",
                    body: html
                }
                
                client.ajaxRequest("POST", "/response", response, function () {
                    self.log("Done: "+new Date()+" - "+url + " - Request: "+requestId+" Thread "+self.config.id)
                })
            },
            
            listen: function () {
                this.log("Starting thread "+this.config.id)
                this.getCometClient().listen();
                this.log("Started thread "+this.config.id)
            },
            
            stop: function () {
                this.log("Stopping server "+this.config.id)
                this.getCometClient().disconnect()
                this.log("Sent stop signal "+this.config.id)
            },
            
            log: function (msg) {
                this.getWp().sendMessage({ action: "log", message: msg }, this.getMotherId())
            }
        }

    })
})