/**
 * Class to perform simple synchronous AJAX Requests used for component loading.
 * @name JooseX.SimpleRequest
 * @class
 */
 
Class("JooseX.SimpleRequest", {

    have : {
    	req : null
	},
	
    methods: {
    	
        initialize: function () {
            if (window.XMLHttpRequest)
                this.req = new XMLHttpRequest();
            else
                this.req = new ActiveXObject("Microsoft.XMLHTTP");
        },
        
        
        /**
         * Fetches text from an URL
         * @name getText
         * @param {string} url The URL
         * @function
         * @memberof JooseX.SimpleRequest
         */
        getText: function (urlOrOptions, async, callback, scope) {
            var req = this.req;
            
            var headers;
            var url;
            
            if (typeof urlOrOptions != 'string') {
                headers = urlOrOptions.headers;
                url = urlOrOptions.url;
                async = async || urlOrOptions.async;
                callback = callback || urlOrOptions.callback;
                scope = scope || urlOrOptions.scope;
            } else url = urlOrOptions;
            
            req.open('GET', url, async || false);
            
            if (headers) Joose.O.eachSafe(headers, function (value, name) {
                req.setRequestHeader(name, value);
            });
            
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
            
            if (!async)
                if (req.status == 200 || req.status == 0) return req.responseText; else throw "File not found: " + url;
            
            return null;
        }
        
    }
    
});