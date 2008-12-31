Module("Addressable", function () {
    
    var connection;
    
    Class("XDomainRequest", {
        classMethods: {
            getConnection: function () {
        
                if(connection) {
                    return connection
                }
        
                if(Addressable.Constants.insideGearsWorker()) {
                    connection = new Addressable.GearsRequest();
                } else {
                    connection = new Addressable.ScriptRequest();
                }
                return connection
            }
        }
    })
})