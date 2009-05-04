Module("Addressable", function (m) {
    Class("Constants", {
        classMethods: {
            appHost: function () {
                return this.isLocal() ? "self:8084" : "universal-comet.appspot.com"
            },
            
            insideGearsWorker: function () {
                return Addressable.GEARS ? true : false // global set in gearsWorkers.js
            },
            
            gearsWorkerFile: function () {
                return this.isLocal() ? "/gears/gears-client-server.js" : "/gears/gears-client-server-mini.js"
            },
            
            activeChannelExpirationSeconds: function () {
                return 5
            },
            
            cometRequestInterval: function () {
                return 1000
            },
            
            isLocal: function () {
                return window.__LOCAL__ == true
            }
        }
    })
})