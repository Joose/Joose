

Test.RealWorld = function () {
    
}

Test.RealWorld.libLoader = function (lib) {
    var url = this[lib]
    document.write('<script src="'+url+'"><'+'/script>')
}

Test.RealWorld.library = {
    jQuery:    "http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js",
    Prototype: "http://ajax.googleapis.com/ajax/libs/prototype/1.6.0.3/prototype.js",
    mootools:  "http://ajax.googleapis.com/ajax/libs/mootools/1.11/mootools.js",
    dojo:      "http://ajax.googleapis.com/ajax/libs/dojo/1.2.0/dojo/dojo.xd.js.uncompressed.js",
    yui:       "http://yui.yahooapis.com/2.6.0/build/yahoo-dom-event/yahoo-dom-event.js"
}

Test.RealWorld.prototype =  {
    
    extendObject: function () {
        Object.prototype.evilObjectExtention = function () {
            throw "Do not call me"
        }
        
        Object.prototype.veryGlobalValue     = 42;
    },
    
    extendArray: function () {
        Array.prototype.yetAnotherForEach = function (func) {
            for(var i in this) {
                func.apply(this[i])
            }
        }
    },
    
    extendFunction: function () {
        Function.prototype.execute = function (self) {
            this.apply(self, arguments)
        }
    },
    
    runWithJQuery: function () {
        Test.RealWorld.libLoader("jQuery")
    },
    
    runWithPrototype: function () {
        Test.RealWorld.libLoader("Prototype")
    },
    
    runWithMootools: function () {
        Test.RealWorld.libLoader("mootools")
    },
    
    runWithDojo: function () {
        Test.RealWorld.libLoader("dojo")
    },
    
    runWithYui: function () {
        Test.RealWorld.libLoader("yui")
    }
    
}