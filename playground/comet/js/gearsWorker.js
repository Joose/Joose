// Central entry point for Gears worker based implementation

google.gears.workerPool.allowCrossOrigin()

var wp       = google.gears.workerPool;
var server, sendLog;

Addressable.GEARS = true;

wp.onmessage = function(a, b, message) {
    
    sendLog = function (msg) {
        wp.sendMessage({ event: "log", msg: msg }, message.sender)
    }
    
    
    
    var event = message.body.event
    var data  = message.body.data
    
    if(event == "connect" && !server) {
        sendLog("Initializing server "+data.referrer)
        server = new Addressable.GearsServer({
            id: data.id,
            url: data.url,
            referrer: data.referrer,
            channel:  data.channel,
            requestCallback: function (data) { // forward everything to stub
                wp.sendMessage({ event: "request", data: data }, message.sender)
            }
        })
        server.connect(function (id, url) {
            wp.sendMessage({ event: "connect", data: { id: id, url: url }}, message.sender)
        })
    }
}