Module("Addressable", function (m) {
    Class("Constants", {
        classMethods: {
            appHost: function () {
                return "self:8084"
            },
            
            insideGearsWorker: function () {
                return Addressable.GEARS ? true : false // global set in gearsWorkers.js
            }
        }
    })
})