Module("Addressable", function () {
    
    var ID_COOKIE  = "AddressableID";
    var URL_COOKIE = "AddressableURL"
    
    Class("SimpleServer", {
        has: {
            cometClient: {
                is: "rw"
            },
            
            handlers: {
                is: "rw",
                init: function () { return [] }
            },
            
            id: {
                is: "rw"
            },
            
            url: {
                is: "rw"
            },
            
            referrer: {
                is: "rw",
                init: function () { return location.href }
            },
            
            cookie: {
                init: function () { return new Addressable.Cookie() }
            },
            
            // channels differentiate between different windows
            channel: {
                is: "rw"
            }
        },
        
        after: {
            initialize: function () {
                var cookie = this.getCookies();
                if(!this.id) {
                    this.id = cookie.id
                }
                if(!this.url) {
                    this.url = cookie.url
                }
            }
        },
        
        methods: {
            
            getCookies: function () {
    
                return {
                    id: this.cookie.get(ID_COOKIE),
                    url: this.cookie.get(URL_COOKIE)
                }
            },
            
            setCookies: function (id, url) {
                if(id && url) {
                    this.cookie.set(ID_COOKIE, id)
                    this.cookie.set(URL_COOKIE, url)
                }
            },
            
            connect: function (callback) {
                var self       = this;
                var connection = Addressable.XDomainRequest.getConnection();
            
                var cometClient = new Addressable.CometClient({
                    connection: connection,
                    callback:   self.requestHandler(),
                    logger:     self,
                    url:        self.listenUrl(),
                    useGears:   self.useGears()
                })
                self.setCometClient(cometClient)
                
                var handleConnect = function (id, url) {
                    self.setId(id)
                    self.setUrl(url)
                    callback.call(self, id, url)
                    cometClient.listen({
                        ids:      self.getId(),
                        referrer: self.getReferrer()
                    });
                }
               
                if(this.id && this.url) {
                    handleConnect(this.id, this.url)
                    self.log("Saved connection "+this.url + "id: "+this.id)
                    return
                }
                
                connection.get(this.connectUrl(), { 
                    time: new Date().getTime()
                }, function (data) {
                    self.log("Connection successful "+data.url + "id: "+data.id)
                    handleConnect(data.id, data.url)
                    self.setCookies(data.id, data.url)
                })
            },
            
            useGears: function () {
                return false
            },
            
            requestHandler: function () {
                var self = this;
                
                return function requestCallback (data) {
                    var handlers = self.getHandlers();
                    var found    = false;
                    var requests = data[self.getId()];
                    if(requests) {
                        Joose.A.each(requests, function (request) {
                            var url   = request.url;
                            var paras = request.paras;
                            self.log("Handling url "+url)
                            Joose.A.each(handlers, function (handler) {
                                if(!found) {
                                    var prefix   = handler[0];
                                    var callback = handler[1];
                                    if(url.indexOf(prefix) === 0) {
                                        callback.call(request, url, paras)
                                    }
                                    found = true;
                                }
                            })
                        })
                    }
                }
            },
            
            addHandler: function (urlPrefix, callback) {
                if(typeof urlPrefix == "function" && arguments.length == 1) {
                    callback  = urlPrefix
                    urlPrefix = ""
                }
                this.handlers.push([urlPrefix, callback])
            },
            
            connectUrl: function () {
                return "http://"+Addressable.Constants.appHost()+"/connect"
            },
            
            listenUrl: function () {
                return "http://"+Addressable.Constants.appHost()+"/listen"
            },
            
            log: function (msg) {
                if(window.console)
                    console.log(msg)
            }
        }
    })
})