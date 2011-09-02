var argv = require('optimist')
    .usage('Usage: $0 {OPTIONS}')
    .wrap(80)
    
    .option('root', {
        desc    : 'A path directory which will act as a web root. Default is current working directory'
    })
    
    .option('require', {
        alias   : 'r',
        desc    : 'A file to nodify'
    })
    
    .option('help', {
        alias   : 'h',
        desc    : 'Show this message'
    })
    .check(function (argv) {
        if (argv.help) throw ''
        
        if (!argv.require) throw new Error("At least one `require` option should be provided")
    })
    .argv


var path        = require('path')

var librarian   = new require('librarian')({
    root        : path.resolve(argv.root || './')
})

librarian.writeBundleTo(process.stdout, [].concat(argv.require || []))

process.stdout.end()