Module("Addressable", function () {
    
    var counter = 0;
    var timeout;
    
    Class("ScriptRequest", {
        does: Addressable.Connection,
        
        methods: {
            get: function (url, data, callback) {
                var self = this;
                data = data || {};
                data.__NO_CACHE__      = Math.random();
                data.__REQUEST__ID__   = counter++;
                data.__STRATEGY__      = "script"
                
                var dataString = ""
                if (data) {
                    for ( var i in data) {
                        dataString += encodeURIComponent(i) + "="
                                + encodeURIComponent(data[i]) + "&"
                    }
                }
                if (data) {
                    url += "?" + dataString
                }
            
                var script = document.createElement("script");
                script.src = url
                
                var target = document.getElementsByTagName("body")[0]
                if(target == null) {
                    target = document.getElementsByTagName("head")[0]
                }

                target.appendChild(script);
                
                this.meta.c.Requests[data.__REQUEST__ID__] = {
                    target:   target,
                    tag:      script,
                    callback: function () {
                        this.target.removeChild(this.tag)
                        delete self.meta.c.Requests[data.__REQUEST__ID__] 
                        if(typeof callback == "function") {
                            callback.apply(window, arguments)
                        } 
                    }
                }
            }
        }
    })
    
    window.Addressable.ScriptRequest.Requests = {};
})