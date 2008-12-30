Module("Addressable", function () {
    
    // Starts 
    
    Class("GearsServerStub", {
        isa: Addressable.SimpleServer,
        
        has: {
            wp:       {},
            workerId: {}
        },
        
        override: {
            connect: function (onConnect) {
                try {
                    this._connect(onConnect)
                } catch(e) {
                    this.SUPER(onConnect); // try without gears
                }
            }
        },
        
        methods: {
            _connect: function (onConnect) {
                var self = this;
                var wp   = google.gears.factory.create('beta.workerpool');
                this.wp  = wp;
                
                var cookie = this.getCookies()
            
                this.workerId = wp.createWorkerFromUrl("http://"+Addressable.Constants.appHost()+"/gears/gears-client-server.js");
                self.log("Starting worker")
                wp.sendMessage({ 
                    event: "connect",
                    data: {
                        id:  cookie.id || "",
                        url: cookie.url || "",
                        referrer: location.href,
                        channel:  self.channel,
                        isLocal:  Addressable.Constants.isLocal()
                    }
                }, this.workerId)
                
                var requestHandler = self.requestHandler();
                
                wp.onmessage = function(a, b, message) {
                    var body = message.body;
                    
                    if(body.event == "connect") {
                        self.log("received connect event "+body.data.url)
                        if(onConnect) {
                            onConnect(body.data.id, body.data.url)    
                        }
                        self.setCookies(body.data.id, body.data.url)
                    }
                    else
                    if(body.event == "request") {
                        self.log("received request event "+body.data.message)
                        self.handleMessage(body.data)
                    }
                    else
                    if(body.event == "log") {
                        self.log(body.msg)
                    } else {
                        self.log("received unknown event "+body.event)
                    }
                }
            }
        }
        
    })
})