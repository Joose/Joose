var argv = require('optimist')
    .usage('Usage: $0 {OPTIONS}')
    .wrap(80)
    .option('port', {
        alias   : 'p',
        desc    : 'The port to listen for connections'
    })
    .option('webroot', {
        alias   : 'r',
        desc    : 'A path directory which will act as a web root. Default is current working directory'
    })
//    .option('entry', {
//        alias : 'e',
//        desc : 'An entry point of your app'
//    })
//    .option('alias', {
//        alias : 'a',
//        desc : 'Register an alias with a colon separator: "to:from"\n'
//            + "Example: --alias 'jquery:jquery-browserify'"
//    })
//    .option('plugin', {
//        alias : 'p',
//        desc : 'Use a plugin. Use a colon separator to specify additional '
//            + 'plugin arguments as a JSON string.\n'
//            + 'Example: --plugin \'fileify:["files","."]\''
//    })
    .option('help', {
        alias : 'h',
        desc : 'Show this message'
    })
    .check(function (argv) {
        if (argv.help) throw ''
    })
    .argv


var url         = require('url')
var path        = require('path')
var http        = require('http')
var paperboy    = require('paperboy')

var port        = argv.port || 5000
var webRoot     = path.resolve(argv.webroot || './')

var librarian   = new require('librarian')({
    
    webRoot     : webRoot
})


http.createServer(function(req, res) {

    var pathName        = path.normalize(url.parse(req.url).pathname)
    
    if (/\.\.\//.test(pathName)) throw new Error("Can't serve the files above the webRoot directory")
    
    
    librarian.find(pathName, function () {
        
        var ip = req.connection.remoteAddress;
        
        paperboy
            .deliver(webRoot, req, res)
            .addHeader('Expires', 300)
            .addHeader('X-PaperRoute', 'Node')
            .addHeader('Content-Type', 'text/plain')
            .before(function() {
              console.log('Received Request');
            })
            .after(function(statCode) {
              log(statCode, req.url, ip);
            })
            .error(function(statCode, msg) {
              res.writeHead(statCode, {'Content-Type': 'text/plain'});
              res.end("Error " + statCode);
              log(statCode, req.url, ip, msg);
            })
            .otherwise(function(err) {
              res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end("Error 404: File not found");
              log(404, req.url, ip, err);
            })
        
    }, function () {
        throw new Error("Can't find file: [" + pathName + "] in the webRoot: [" + webRoot + "]")
    })
    
}).listen(port)


var log = function (statCode, url, ip, err) {
    var logStr = statCode + ' - ' + url + ' - ' + ip;
    
    if (err) logStr += ' - ' + err;
    
    console.log(logStr);
}
