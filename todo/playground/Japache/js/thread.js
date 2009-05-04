

/*
 * To be executed within a gears worker
 */

var wp       = google.gears.workerPool;
var server;
wp.onmessage = function(a, b, message) {
    
    var action = message.body.action
    
    if(action == "start") {
        var config = message.body.config || config
        server     = new Japache.Server({ 
            wp:       wp, 
            config:   config,
            motherId: message.sender,
            requestHandler: new Japache.ExampleApp()
        })
        server.listen();
    }
    else if(action == "stop") {
        if(server)
            server.stop();
    } 
    else {
        throw "unknown action "+action
    }
}
