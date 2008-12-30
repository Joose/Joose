Module("Addressable", function () {
    
    var counter = 0;
    var timeout;
    
    // Makes a request using Gears API. Response is always assumed to be JSON.
    // (Requires json2.js to be present)
    // Because we use are a cross-origin-worker from the domain of the connection target we can use a regular http request
    Class("GearsRequest", {
        does: Addressable.Connection,
        
        methods: {
            get: function (url, data, callback, errorCallback) {
                return this.request("GET", url, data, callback)
            },
            request: function (method, url, data, callback, errorCallback) {
                var request = google.gears.factory.create('beta.httprequest');
                var dataString = ""
                if (data) {
                    for ( var i in data) {
                        dataString += encodeURIComponent(i) + "="
                            + encodeURIComponent(data[i]) + "&"
                    }
                }
                if (data && method == "GET") {
                    url += "?" + dataString
                }
                request.open(method, url, true);

                request.onreadystatechange = function onreadystatechange() {
                    if (request.readyState == 4) {
                        if (request.status >= 200 && request.status < 400) {
                            var res = request.responseText;
                            callback(JSON.parse(res))
                        } else {
                            if (errorCallback) {
                                return errorCallback(request)
                            } else {
                                throw new Error("Error fetching url " + url
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