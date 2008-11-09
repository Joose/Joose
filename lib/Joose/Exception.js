// Joose.Exception does currently not work!
// I commited this only to demonstrate what options do not work.

/*
 * What Joose.Exception should do: Provide a way to do JS Exception
 * - that use the standard try catch mechanism
 * - and (the hard part) that show a valid stack trace in firebug
 * - More info: http://joose-js.blogspot.com/2008/10/exceptions-in-javascript.html
 */

Class("Joose.Exception", {
    has: {
        message: {}
    },
    methods: {
        initialize: function (message) {
            this.message = message
        },
        
        toString: function () {
            return this.message
        }
    },
    
    classMethods: {
        patchError: function () {
            Error.prototype.joosify = function () {
                if(this.joose) {
                    return this.joose
                }
                var match;
                if(match = this.message.match(/^JOOSEERROR=(.+);(.*)/)) {
                    var className = match[1];
                    var message   = match[2];
                    var c         = this.classNameToClassObject(className);
                    this.joose    = new c(this.message)
                    return this.joose
                }
                throw new Error("Not a Joose Exception: "+this.message)
            }
        }
    }
})


/*(function () {
    var ErrorBootstrap = function (message, filename, lineNumber) {
        this.message = message;
        if(filename) {
            this.filename = filename;
        }
        if(lineNumber) {
            this.lineNumber = lineNumber
        }
        var error = new Error(message, filename, lineNumber);
        this.stack = error.stack
    }
    ErrorBootstrap.prototype = new Error();
    
    var toString = Error.prototype.toString;
    
    Joose.Exception = joosify("Joose.Exception", ErrorBootstrap);
    
    Joose.Exception.meta.addMethod("toString", toString);
})()*/

/*Joose.Exception = function () {
    var f = function () {};
    var c = Error;
    f.prototype = c.prototype;
    f.prototype.constructor = c;
    var obj = new f();
    c.apply(obj, arguments);
    
    for(var i in obj) {
        this[i] = obj[i]
        console.log(""+i+" -> "+obj[i])
    }
}*/

//Joose.Exception.prototype = new Error()


/*Class("Joose.Exception", {
    classMethods: {
        "throw": function (message) {
            var error = new Error(message)
            var ex    = error;
            
            for(var i in error) {
                ex[i] = error[i]
            }
            
            if(ex.stack) {
                var stack = ex.stack.split("\n")
                var first = stack.shift()
                stack.shift()
                var parts = stack[0].split("@")
                var parts = parts[1].split(":")
                var lineNumber = parts.pop()
                var fileName   = parts.join(":")
                ex.fileName    = fileName
                ex.lineNumber  = lineNumber
                ex.sourceLine  = lineNumber
                ex.sourceName  = fileName
                stack.unshift(first)
                ex.stack  = stack.join("\n")
                //ex.category = "js"
            }
            
            throw ex
        }
    }
})*/