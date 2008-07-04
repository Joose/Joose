/**
 * Class to perform simple synchronous AJAX Requests used for component loading.
 * @name Joose.SimpleRequest
 * @class
 */
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
        getText: function (url) {
            this._req.open("GET", url, false);
            try {
                this._req.send(null);
                if (this._req.status == 200 || this._req.status == 0)
                    return this._req.responseText;
            } catch (e) {
                throw("File not found: " + url);
                return null;
            };

            throw("File not found: " + url);
            return null;
        }
    }
})