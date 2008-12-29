Module("Addressable", function () {
    
    var timer = google.gears.factory.create('beta.timer');
    
    Class("GearsServer", {
        isa: Addressable.SimpleServer,
        
        has: {
            cookie: {},
            referrer: {
                is: "rw"
            },
            cookie: {
                init: function () { return new Addressable.GearsDBHash({name: "cookie"}) }
            },
            ids: {
                init: function () { 
                    return new Addressable.GearsDBHash({
                        name: "ids2",
                        expires: Addressable.Constants.activeChannelExpirationSeconds()
                    }) 
                }
            },
            channel: {}
        },
        
        before: {
            handleConnect: function (callback, id, url) {
                var self = this;
                self.ids.clear()
                var active = function () {
                    self.ids.set(id, true)
                }
                active();
                self.getTimer().setInterval(active, Addressable.Constants.activeChannelExpirationSeconds() - 1) // keep us in the set of watched ids
            }
        },
        
        methods: {
            
            // handled in stub
            setCookies: function () {},
            getCookies: function () { return {} },
            
            getListenIds: function () {
                var ids = this.ids.keys().join(",");
                this.log("Listening to ids "+ids)
                return ids;
            },
            
            useGears: function () {
                return true
            },
            
            log: function (msg) {
                sendLog(this.meta.className() + ": "+ msg) // global defined in gearsWorker.js
            },
            
            getTimer: function () {
                if(!timer) {
                    timer = google.gears.factory.create('beta.timer');
                }
                return timer
            }
        }
    })
})