require = (function () {
    
    var require = function (fileName, cwd) {
        if (!file) throw new Error("Invalid argument to require")
        
        var resolved    = resolve(fileName, cwd)
        
        var module      = modules[ resolved ]
        
        if (!module) throw new Error('Failed to resolve module: ' + fileName + ', tried: ' + resolved)
        
        return cache[ resolved ] || (cache[ resolved ] = module(require))
    }
    
    var coreModules = {
        'assert'    : true,
        'events'    : true,
        'fs'        : true,
        'path'      : true,
        'vm'        : true
    }
    
    var modules = require.modules   = {}
    var cache   = require.cache     = {}
    
    
    var resolveInFileSystem = function (fileName, isFileNotDirectory) {
        // check the available files first
        if (modules[ fileName ])            return fileName
        if (modules[ fileName + '.js' ])    return fileName + '.js'
        
        // no trailing slashes for directories
        fileName    = fileName.replace(/\/+$/, '')
        
        // if it can be a directory (default) - then check for the package.json
        if (!isFileNotDirectory) {
            if (modules[ fileName + '/package.json']) {
                var packageJSON = require(fileName + '/package.json')
                
                var main        = packageJSON.main
                
                // if `main` key presents - resolve it as file
                if (main)       return resolve(main, fileName, true)
            }
            
            // and finally try to load "index"
            return resolveInFileSystem(fileName + '/index', true)
        }
        
        return null 
    }
    
    
    var cleanupPath = function (path) {
        path            = path.replace(/\/+/g, '/')
        
        var currentDir  = /(^|\/)\.\//
        var parentDir   = /[^/.]+\/\.\.\//
        
        while (currentDir.test(path))   path = path.replace(currentDir, '$1')
        while (parentDir.test(path))    path = path.replace(parentDir, '')
        
        return path
    }
    
    var resolve = function (fileName, cwd, isFileNotDirectory) {
        if (coreModules[ fileName ]) throw new Error("Core modules are not supported yet")
        
        cwd         = cwd || '.'
        
        // no need to resolve absolute links 
        if (/^\//.test(fileName))               return resolveInFileSystem(fileName, isFileNotDirectory)
        if (/^(\.\/|\.\.\/)/.test(fileName))    return resolveInFileSystem(cleanupPath(cwd + '/' + fileName))
        
        // from here it should be in `node_modules`
        
        var node_modules_dirs   = []
        
        var match
        var dir                 = cwd
        
        while (match = /((.*)(?:^|\/)node_modules)(?=\/|$)/.exec(dir)) {
            node_modules_dirs.push(match[ 1 ])
            
            dir = match[ 2 ]
        }
        
        var count   = node_modules_dirs.length
        
        while (count--) {
            var resolved = resolveInFileSystem(fileName, node_modules_dirs.shift(), isFileNotDirectory)
            
            if (resolved) return resolved
        }
        
        return null
    }
    

    var child   = require.child = function (dirName) {
        
        var childRequire        = function (fileName) { return require(fileName, dirName) }
        
        childRequire.resolve    = function (fileName) { return resolve(fileName, dirName) }
        childRequire.modules    = modules
        childRequire.cache      = cache
        childRequire.child      = child
        
        return childRequire
    }
    
})()






require.modules["/node_modules/kiokujs/lib/KiokuJS/Backend.js"] = function (rootRequire) {

    var __dirname       = "/node_modules/kiokujs/lib/KiokuJS"
    var __filename      = "/node_modules/kiokujs/lib/KiokuJS/Backend.js"
    
    var exports         = {}
    var module          = { exports : exports }
    
    var require         = rootRequire.child(__dirname)
    
    require.cache[ __filename ] = exports; 
    
    // this wrapping is generally not required (only protects from "return" in original content)
    ;(function () {
        //ORIGINAL_CONTENT
    })()
    
    return module.exports
}

