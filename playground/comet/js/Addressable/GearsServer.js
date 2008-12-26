Module("Addressable", function () {
    Class("GearsServer", {
        isa: Addressable.SimpleServer,
        
        has: {
            cookie: {},
            referrer: {
                is: "rw"
            },
            requestCallback: {
                is: "rw"
            }
        },
        
        methods: {
            
            // handled in stub
            setCookies: function () {},
            getCookies: function () { return {} },
            
            requestHandler: function () {
                var self     = this;
                var callback = this.getRequestCallback();
                
                return function (data) {
                    if(data[self.getId()].length > 0) {
                        callback(data)
                    }
                }
            },
            
            useGears: function () {
                return true
            },
            
            log: function (msg) {
                sendLog(msg) // global defined in gearsWorker.js
            }
        }
    })
})