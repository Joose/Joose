Module("Addressable", function() {
    
    Class("CometClient", {
        
        has: {
            url: {
                is: "rw",
                required: true
            },
            callback: {
                is: "rw",
                required: true
            },
            
            server: {
                is: "rw",
                required: true
            },
            
            doDisconnect: {
                is: "rw",
                init: false
            },
            
            logger: {
                is: "rw",
                required: true
            },
            
            connection: {
                isa: Addressable.Connection,
                is: "rw",
                required: true
            },
            
            requestCounter: {
                init: 0
            },
            
            useGears: {
                
            }
        },
        
        methods: {
            
            disconnect: function () {
                this.setDoDisconnect(true)
            },
        
            listen: function () {
                var self    = this;
                var handleResponse = function (text) {
                    self.handleResponse(text);
                    if(!self.doDisconnect) {
                        self.getTimer().setTimeout(function () {
                            self.listen();
                        }, Addressable.Constants.cometRequestInterval())
                    }
                }
                
                this.connection.get(this.getUrl(), this.getServer().getListenParas(), handleResponse, function (err) {
                    self.logger.log(err)
                })
            },
            
            handleResponse: function () {
                //try {
                    this.getCallback().apply(this, arguments)
                //} catch(e) {
                //    this.logger.log("Error: "+e)
                //}
            },
            
            getTimer: function () {
                return this.getServer().getTimer()
            }
        }

    })
})