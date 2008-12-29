Module("Addressable", function () {
    
    var ID_COOKIE       = "AddressableID";
    var URL_COOKIE      = "AddressableURL";
    var CHANNEL_COOKIE  = "AddressableChannel";
    
    var ACTIVITY_COOKIE = "AddressableActive";
    
    var REQUEST_COUNT   = 0;
    
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
            // If there is anything in window.name we use that, otherwise we set window.name to make the channel name persistent per session
            channel: {
                isa: TYPE.AddressableChannel,
                is: "rw",
                init: function () { 
                    if(window.name) {
                        return window.name
                    } else {
                        window.name = "ch"+Math.floor(Math.random() * 1000);
                        return window.name
                    }
                } // Taking chances
            },
            
            // the Addressable.Server object
            facade: {
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
            
            clearUrl: function (url) { // remove channel from saved url
                url = url.replace(/-[a-z0-9]+$/, "")
                return url
            },
            
            setCookies: function (id, url) {
                if(id && url) {
                    
                    url = this.clearUrl(url);
                    
                    this.cookie.set(ID_COOKIE, id)
                    this.cookie.set(URL_COOKIE, url)
                }
            },
            
            getListenIds: function () { // Be default only one id
                return this.getId()
            },
            
            getListenParas: function () {
                return {
                    ids:      this.getListenIds(),
                    referrer: this.getReferrer(),
                    count:    REQUEST_COUNT++
                }
            },
            
            handleConnect: function (callback, id, url) {
                var self = this;
                self.setId(id)
                
                var channel = self.getChannel();
                if(channel) {
                    self.log("URL "+url)
                    url  = this.clearUrl(url) // remove channel from saved url
                    url += "-"+channel
                }
                
                self.setUrl(url);
                callback.call(self, id, url);
                
                var interval = self.getTimer().setInterval(function () {
                    if(self.passiveMode()) {
                        self.pollDataStore()
                    } else {
                        self.getTimer().clearInterval(interval)
                        self.log("Start listening")
                        self.getCometClient().listen();
                    }
                }, 500)
            },
            
            connect: function (callback) {
                var self       = this;
                var connection = Addressable.XDomainRequest.getConnection();
            
                var cometClient = new Addressable.CometClient({
                    connection: connection,
                    server:     self,
                    callback:   self.requestHandler(),
                    logger:     self,
                    url:        self.listenUrl(),
                    useGears:   self.useGears()
                })
                self.setCometClient(cometClient)
               
                if(this.id && this.url) {
                    self.handleConnect(callback, this.id, this.url)
                    self.log("Saved connection "+this.url + "id: "+this.id)
                    return
                }
                
                var paras = { 
                    time: new Date().getTime()
                }
                if(Addressable.Constants.isLocal()) {
                    paras.__test__ = 1;
                }
                connection.get(this.connectUrl(), {}, function (data) {
                    self.log("Connection successful "+data.url + "id: "+data.id)
                    self.handleConnect(callback, data.id, data.url)
                    self.setCookies(data.id, data.url)
                })
            },
            
            useGears: function () {
                return false
            },
            
            sendToOtherChannel: function (request) {
                var name = CHANNEL_COOKIE+"-"+request.id+"-"+request.channel;
                this.log("Send to "+name)
                this.cookie.set(name, JSON.stringify(request))
            },
            
            pollDataStore: function () {
                var name = CHANNEL_COOKIE+"-"+this.id+"-"+this.getChannel();
                var value = this.cookie.get(name);
                if(value) {
                    this.log("Got value from data store")
                    this.cookie.set(name,"");
                    var request = JSON.parse(value);
                    this.processRequest(request, request.id)
                }
            },
            
            passiveMode: function () {
                var val = this.cookie.get(ACTIVITY_COOKIE)
                var now = new Date().getTime()
                //this.log("Las activity "+val)
                if(val && now - parseInt(val,10) < Addressable.Constants.activeChannelExpirationSeconds() * 1000) {
                    //this.log("passive")
                    return true
                }
                this.log("active")
                return false
            },
            
            signalActivity: function () {
                var now    = new Date().getTime()
                //this.log("Signal activity")
                this.cookie.set(ACTIVITY_COOKIE, now)
            },
            
            processRequest: function (request, id) {
                var self      = this;
                var myChannel = self.getChannel();
                request.id    = id;
                var channel   = request.channel;
                if(channel   != myChannel || id != this.id) {
                    self.sendToOtherChannel(request)
                    return // continue
                }
                var message   = request.message;
                
                self.handleMessage(request)
            },
            
            handleMessage: function (request) {
                if(this.facade.onmessage) {
                    this.facade.onmessage.call(request, request.message)
                } else {
                    this.postMessage(request.message)
                }
            },
            
            postMessage: function (message) {
                if(window.postMessage) {
                    var event = document.createEvent("MessageEvent");
                    event.initMessageEvent("message", false, false, message, "client-server.appspot.com", location.href, window);
                    window.dispatchEvent(event)
                }
            },
            
            requestHandler: function () {
                var self = this;
                
                return function requestCallback (data) {
                    self.signalActivity();
                    Joose.O.each(data, function (requests, id) {
                        Joose.A.each(requests, function (request) {
                            self.processRequest(request, id)
                        })
                    })
                }
            },
            
            connectUrl: function () {
                return "http://"+Addressable.Constants.appHost()+"/connect"
            },
            
            listenUrl: function () {
                return "http://"+Addressable.Constants.appHost()+"/listen"
            },
            
            log: function (msg) {
                if(window.console)
                    console.log(this.meta.className() + ": "+ msg)
            },
            
            getTimer: function () {
                return window
            }
        }
    })
})