Module("block.ui", function (m) {
    Class("Query", {
        has: {
            query: {
                is: "rw"
            }
        },
        
        methods: {
            asHash: function () {
                return this.query;
            },
    
            param: function (name) {
                return this.query[name]
            },
    
            initialize: function () {
                var search = window.location.search;
                var parts  = search.split("?");
                var search = parts[1];

                if(search == null) {
                    search = "";
                }
    
                parts      = search.split("&");
    
                var query  = {};
    
                for(var i = 0; i < parts.length; i++) {
                    var pair = parts[i].split("=");
                    query[unescape(pair[0])] = unescape(pair[1])
                }
        
                this.setQuery(query)
            }
        }
    })
});