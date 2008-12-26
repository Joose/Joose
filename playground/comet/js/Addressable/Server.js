Module("Addressable", function () {
    Class("Server", {
        
        has: {
            implementation: {
                is: "rw"
            },
            
            channel: {
                is: "rw"
            }
            
            useGears: {
                is: "rw",
                init: true
            }
        },
        
        after: {
            initialize: function () {
                this.setImplementation( this._serverFactory() )
            }
        },
        
        methods: {
            connect: function (onConnect) {
                this.implementation.connect(onConnect)
            },
            
            addHandler: function (urlPrefix, callback) {
                this.implementation.addHandler.apply(this.implementation, arguments)
            },
            
            _serverFactory: function () {
                if(this.clientCanGears()) {
                    return new Addressable.GearsServerStub();
                } else {
                    return new Addressable.SimpleServer();
                }
            },
            
            clientCanGears: function () {
                if(this.useGears) {
                    JooseGearsInitializeGears()
                    return window.google && google.gears
                }
                return false
            }
        }
        
    })
})