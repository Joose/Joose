/**
 * Joose.Gears is a meta class for classes that want to delegate work to gears workers
 * @name Joose.Gears
 * @extends Joose.Class
 * @constructor
 */

(function (Class) {

Class("Joose.Gears", {
    isa: Joose.Class,
    has: {
        wp: {  },
        calls: { init: {} },
        callIndex: { init: 0 }
    },
    
    after: {
        initialize: function () {
            JooseGearsInitializeGears() 
            if(this.canGears()) {
                this.wp = google.gears.factory.create('beta.workerpool');
                var me = this;
                this.wp.onmessage = function (a,b,message) {
                    me.handleGearsMessage(message)
                }
            }
        }
    },
    
    methods: {
        
        /**
         * Class builder method
         * Defines workers for the class (The class must have the meta class Joose.Gears)
         * @function
         * @param classObject {object} Maps method names to function bodies
         * @name workers
         * @memberof Joose.Builder
         */    
        /** @ignore */
        handlePropworkers: function (map) {
            var me = this;
            Joose.O.eachSafe(map, function (func, name) {
                me.addWorker(name, func)
            })
        },
        
        handleGearsMessage: function (message) {
            var paras  = message.body
            var cbName = paras.to;
            var ret    = paras.ret;
            var object = this.calls[paras.index];
            if(object.meta.can(cbName)) {
                object[cbName].call(object, ret)
            }
            //delete this.calls[paras.index]
        },
        
        canGears: function () {
            return window.google && window.google.gears && window.google.gears.factory
        },
        
        /**
         * Adds a worker to the class
         * @function
         * @name addWorker
         * @param {string} Name of the worker
         * @param {function} Function body of the worker
         * @param {props} Optional properties for the created method (ignored)
         * @memberof Joose.Gears
         */    
        addWorker:         function (name, func, props) {
            
            var cbName  = "on"+Joose.S.uppercaseFirst(name)

            var ajaxRequestFunc = this.meta.getClassObject().ajaxRequest;
            
            // No gears, then work inline
            if(!this.canGears()) {
                var wrapped = function () {
                    var me = this;
                    var object = {
                        sendReturn:     function (ret, cbName) { if(me.meta.can(cbName)) me[cbName].call(me, ret) },
                        clientHasGears: function () { return false },
                        ajaxRequest:    ajaxRequestFunc
                    };
                    var ret = func.apply(object, arguments);
                    object.sendReturn(ret, cbName)
                }
                this.addMethod(name, wrapped, props)
                return
            }
            
            // OK, we have gears support
            
            var jsonUrl = this.can("jsonURL") ? this.c.jsonURL(): "json2.js";
            
            var json    = new Joose.SimpleRequest().getText(jsonUrl)
                
            var source  = 
              "var timer = google.gears.factory.create('beta.timer');\n"+ // always provide timer
              "function aClass () {}; aClass.prototype."+name+" = "+func.toString()+"\n\n"+
              "aClass.prototype.clientHasGears = function () { return true }\n"+
              "aClass.prototype.ajaxRequest = "+ajaxRequestFunc.toString()+"\n\n"+
              "var wp = google.gears.workerPool;\n" +
              "wp.onmessage = function (a,b,message) {\n"+
              
              "var paras = message.body;\n"+
              
              "var o = new aClass();\n"+
              
              "o.sendReturn = function (ret, cbName) { wp.sendMessage({ ret: ret, to: cbName, index: paras.index }, message.sender) } \n"+ 
              
              "var ret = o."+name+".apply(o, paras.args); if(!ret) ret = null; \n"+
              "o.sendReturn(ret, paras.cbName);"+
              "\n}\n\n";
              
        
            
            source += json
            
            var wp      = this.wp;
            
            var childId = wp.createWorker(source)
            
            var me      = this
                
            var wrapped = function () {
                var args = [];
                for(var i = 0; i < arguments.length; i++) {
                    args.push(arguments[i])
                }
                var message = { args: args, cbName: cbName, index: me.callIndex };
                wp.sendMessage(message, childId);
                me.calls[me.callIndex] = this
                me.callIndex++
                
            }
            this.addMethod(name, wrapped, props)

        }
    },
    
    classMethods: {
        // builds an environment for non gears platform where the regular window looks more like a gears worker
        // APIs implemented: Timer
        setupGearsCompat: function () {
            // setup gears timer api
            window.timer = {
                setTimeout:    function (func, time) { return window.setTimeout(func, time) },
                setInterval:   function (func, time) { return window.setInterval(func, time) },
                clearTimeout:  function (timer) { return window.clearTimeout(timer) },
                clearInterval: function (timer) { return window.clearInterval(timer) }
            };
        },
        
        clientHasGears: function () { //  XXX code dup with instance method
            return window.google && window.google.gears && window.google.gears.factory
        },
        
        // a simple AJAX request that uses gears if available
        ajaxRequest: function (method, url, data, callback, errorCallback) {
        
            var request
            if(this.clientHasGears()) {
                request = google.gears.factory.create('beta.httprequest');
            } else {
                request = window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP"): new XMLHttpRequest();
            }
            var dataString    = ""
            if(data) {
                for(var i in data) {
                    dataString += encodeURIComponent(i)+"="+encodeURIComponent(data[i])+"&"
                }
            }
            var theUrl = url;
            if(data && method == "GET") {
                theUrl += "?"+dataString
            }
            request.open(method, theUrl, true);
                
            request.onreadystatechange = function onreadystatechange () {
                if (request.readyState == 4) {
                    if(request.status >= 200 && request.status < 400) {
                        var res = request.responseText;
                        callback(res)
                    } else {
                        if(errorCallback) {
                            return errorCallback(request)
                        } else {
                            throw new Error("Error fetching url "+theUrl+". Response code: " + request.status + " Response text: "+request.responseText)
                        }
                    }
                }
            };
            if(data && method == "POST") {
                // FIXME determine page encoding instead of always using UTF8
                request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8"); 
                request.send(dataString)
            } else {
                dataString = ""
                request.send(dataString);
            }
        }
    }
})

})(JooseClass);

// Copyright 2007, Google Inc.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//  1. Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//  2. Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//  3. Neither the name of Google Inc. nor the names of its contributors may be
//     used to endorse or promote products derived from this software without
//     specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE AUTHOR ``AS IS'' AND ANY EXPRESS OR IMPLIED
// WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL THE AUTHOR BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
// OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
// WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR
// OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
// ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
// Sets up google.gears.*, which is *the only* supported way to access Gears.
//
// Circumvent this file at your own risk!
//
// In the future, Gears may automatically define google.gears.* without this
// file. Gears may use these objects to transparently fix bugs and compatibility
// issues. Applications that use the code below will continue to work seamlessly
// when that happens.

// Sorry Google for modifying this:) 
function JooseGearsInitializeGears() {
  // We are already defined. Hooray!
  if (window.google && google.gears) {
    return;
  }

  var factory = null;

  // Firefox
  if (typeof GearsFactory != 'undefined') {
    factory = new GearsFactory();
  } else {
    // IE
    try {
      factory = new ActiveXObject('Gears.Factory');
      // privateSetGlobalObject is only required and supported on WinCE.
      if (factory.getBuildInfo().indexOf('ie_mobile') != -1) {
        factory.privateSetGlobalObject(this);
      }
    } catch (e) {
      // Safari
      if (navigator.mimeTypes["application/x-googlegears"]) {
        factory = document.createElement("object");
        factory.style.display = "none";
        factory.width = 0;
        factory.height = 0;
        factory.type = "application/x-googlegears";
        document.documentElement.appendChild(factory);
      }
    }
  }

  // *Do not* define any objects if Gears is not installed. This mimics the
  // behavior of Gears defining the objects in the future.
  if (!factory) {
    return;
  }

  // Now set up the objects, being careful not to overwrite anything.
  //
  // Note: In Internet Explorer for Windows Mobile, you can't add properties to
  // the window object. However, global objects are automatically added as
  // properties of the window object in all browsers.
  if (!window.google) {
    google = {};
  }

  if (!google.gears) {
    google.gears = {factory: factory};
  }
}


