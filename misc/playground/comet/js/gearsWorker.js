// Central entry point for Gears worker based implementation

var wp       = google.gears.workerPool;
var server, sendLog;

var window   = {}

Addressable.GEARS = true;

wp.onmessage = function(a, b, message) {
    
    sendLog = function (msg) {
        wp.sendMessage({ event: "log", msg: msg }, message.sender)
    }

    var event = message.body.event
    var data  = message.body.data
    
    if(event == "connect" && !server) {
        sendLog("Initializing server "+data.referrer)
        window.__LOCAL__ = data.isLocal;
        server = new Addressable.GearsServer({
            id: data.id,
            url: data.url,
            referrer: data.referrer,
            channel:  data.channel,
            facade: {
                onmessage: function () { // forward everything to stub
                    var request = this;
                    wp.sendMessage({ event: "request", data: request }, message.sender)
                }
            }
        })
        
        server.connect(function (id, url) {
            wp.sendMessage({ event: "connect", data: { id: id, url: url }}, message.sender)
        })
    }
}