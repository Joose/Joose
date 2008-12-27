Module("Addressable", function () {
    
    var ID_COOKIE       = "AddressableID";
    var URL_COOKIE      = "AddressableURL";
    var CHANNEL_COOKIE  = "AddressableChannel";
    
    var ACTIVITY_COOKIE = "AddressableActive"
    
    Type("AddressableChannel", {
        uses: TYPE.Str,
        where: function (str) {
            if(str.match(/^\[a-z0-9]+$/)) {
                return true
            } else {
                return false
            }
        }
    })
    
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
                isa: TYPE.AddressableChannel,
                is: "rw",
                init: function () { return ""+Math.floor(Math.random() * 1000) } // Taking chances
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
                    
                    url.replace("-[a-z0-9]+$") // remove channel from saved url
                    
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
                    
                    var channel = self.getChannel();
                    if(channel) {
                        url += "-"+channel
                    }
                    
                    self.setUrl(url);
                    callback.call(self, id, url);
                    
                    var listen = function () {
                        cometClient.listen({
                            ids:      self.getId(),
                            referrer: self.getReferrer()
                        });
                    }
                    
                    var interval = setInterval(function () {
                        if(self.passiveMode()) {
                            self.pollDataStore()
                        } else {
                            clearInterval(interval)
                            self.log("Start listening")
                            listen()
                        }
                    }, 500)
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
            
            sendToOtherChannel: function (request) {
                var name = CHANNEL_COOKIE+"-"+request.channel;
                this.cookie.set(name, JSON.stringify(request))
            },
            
            pollDataStore: function () {
                var name = CHANNEL_COOKIE+"-"+this.getChannel();
                var value = this.cookie.get(name);
                if(value) {
                    this.cookie.set(name,"");
                    var request = JSON.parse(value);
                    this.processRequest(request)
                }
            },
            
            passiveMode: function () {
                var val = this.cookie.get(ACTIVITY_COOKIE)
                var now = new Date().getTime()
                if(val && now - parseInt(val,10) < 5000) {
                    this.log("passive")
                    return true
                }
                this.log("active")
                return false
            },
            
            signalActivity: function () {
                var now    = new Date().getTime()
                this.cookie.set(ACTIVITY_COOKIE, now)
            },
            
            processRequest: function (request) {
                var self      = this;
                var handlers  = self.getHandlers();
                var found     = false;
                var myChannel = self.getChannel();
                var channel   = request.channel
                if(channel   != myChannel) {
                    self.sendToOtherChannel(request)
                    return // continue
                }
                var url     = request.url;
                var paras   = request.paras;
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
            },
            
            requestHandler: function () {
                var self = this;
                
                return function requestCallback (data) {
                    self.signalActivity();
                    var requests = data[self.getId()];
                    if(requests) {
                        Joose.A.each(requests, function (request) {
                            self.processRequest(request)
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