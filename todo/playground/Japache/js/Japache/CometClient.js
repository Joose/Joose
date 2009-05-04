Module("Japache", function() {
    
    var timer = google.gears.factory.create('beta.timer');
    
    Class("CometClient", {
        
        has: {
            url: {
                is: "rw"
            },
            callback: {
                is: "rw",
                required: true
            },
            
            doDisconnect: {
                is: "rw",
                init: false
            },
            
            log: {
                is: "rw",
                required: true
            }
        },
        
        methods: {
            
            disconnect: function () {
                this.setDoDisconnect(true)
            },
        
            listen: function (paras) {
                var self = this;
                var handleResponse = function (text) {
                    self.handleResponse(text);
                    if(!self.doDisconnect) {
                        timer.setTimeout(function () {
                            self.listen(paras);
                        }, 500)
                    }
                }
                
                this.ajaxRequest("POST", this.getUrl(), paras, handleResponse, function (err) {
                    self.log(err)
                })
            },
            
            handleResponse: function (text) {
                var message = JSON.parse(text);
                if(message.data) {
                    this.getCallback()(message)
                }
            },
        
            ajaxRequest: function(method, url, data, callback, errorCallback) {

                var request = google.gears.factory.create('beta.httprequest');
                var dataString = ""
                if (data) {
                    for ( var i in data) {
                        dataString += encodeURIComponent(i) + "="
                                + encodeURIComponent(data[i]) + "&"
                    }
                }
                var theUrl = url;
                if (data && method == "GET") {
                    theUrl += "?" + dataString
                }
                request.open(method, theUrl, true);

                request.onreadystatechange = function onreadystatechange() {
                    if (request.readyState == 4) {
                        if (request.status >= 200 && request.status < 400) {
                            var res = request.responseText;
                            callback(res)
                        } else {
                            if (errorCallback) {
                                return errorCallback(request)
                            } else {
                                throw new Error("Error fetching url " + theUrl
                                        + ". Response code: " + request.status
                                        + " Response text: "
                                        + request.responseText)
                            }
                        }
                    }
                };
                if (data && method == "POST") {
                    // FIXME determine page encoding instead of always using
                    // UTF8
                    request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");
                    request.send(dataString)
                } else {
                    dataString = ""
                    request.send(dataString);
                }
            }
        }

    })
})