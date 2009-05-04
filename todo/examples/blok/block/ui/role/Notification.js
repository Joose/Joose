Module("block.ui.role", function () {
    Role("Notification", {
        methods: {
            updated: function () {
                var listener = this.listener;
                for(var i = 0; i < listener.length; i++) {
                    this.listener[i].notify(this)
                }
            },
            
            addListener: function (object) {
                this.listener.push(object);
            },
            
            removeListener: function (object) {
                var listener = this.listener;
                var without  = [];
                for(var i = 0; i < listener.length; i++) {
                    if(object !== this.listener[i]) {
                        without.push(this.listener[i])
                    }
                }
                this.listener = without
            },
            
            notify: function () {}
        }
    })
})