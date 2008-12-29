Module("Addressable", function () {
    Class("Server", {
        
        has: {
            implementation: {
                is: "rw"
            },
            
            channel: {
                is: "rw"
            },
            
            useGears: {
                is: "rw",
                init: true
            },
            
            onmessage: {
                is: "rw"
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
            
            _serverFactory: function () {
                if(this.clientCanGears()) {
                    return new Addressable.GearsServerStub({ facade: this });
                } else {
                    return new Addressable.SimpleServer({ facade: this });
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