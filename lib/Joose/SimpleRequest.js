/**
 * Class to perform simple synchronous AJAX Requests used for component loading.
 * @name Joose.SimpleRequest
 * @class
 */

(function (Class) {

Class("Joose.SimpleRequest", {

    has: {_req: {}},
    methods: {
        initialize: function () {
            if (window.XMLHttpRequest) {
                this._req = new XMLHttpRequest();
            } else {
                this._req = new ActiveXObject("Microsoft.XMLHTTP");
            }
        },
        /**
         * Fetches text from an URL
         * @name getText
         * @param {string} url The URL
         * @function
         * @memberof Joose.SimpleRequest
         */
        getText: function (url, async, callback, scope) {
            var req = this._req;
            
            req.open('GET', url, async || false);  
            
            try {
                req.onreadystatechange = function (event) {  
                    if (async && req.readyState == 4) {  
                        if (req.status == 200 || req.status == 0) callback.call(scope || this, true, req.responseText);  
                        else callback.call(scope || this, false, "File not found: " + url);  
                    }  
                };  
                req.send(null);
            } catch (e) {
                throw "File not found: " + url;
            };
            
            if (!async) {
                if (req.status == 200 || req.status == 0) return req.responseText; else throw "File not found: " + url;
            } 
            
            return null;
        }
    }
})
})(JooseClass);
