Module("Addressable", function () {
    
    Class("XDomainRequest", {
        classMethods: {
            getConnection: function () {
                if(Addressable.Constants.insideGearsWorker()) {
                    return new Addressable.GearsRequest();
                } else {
                    return new Addressable.ScriptRequest();
                }
            }
        }
    })
})