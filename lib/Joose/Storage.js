Class("Joose.Storage", {
    meta: Joose.Role,
    
    methods: {
        // gets called by the JSON.stringify method
        toJSON: function () {
            return this.pack()
        },
        
        pack: function () {
            
            if(this.meta.can("prepareStorage")) {
                this.prepareStorage()
            }
            
            var o  = {
                __CLASS__: this.packedClassName()
            };
            var me        = this;
            
            var attrs      = this.meta.getAttributes();
            
            Joose.O.each(attrs, function (attr, name) {
                if(attr.isPersistent()) {
                    o[name]   = me[name];
                }
            })
  
            return o
        },
        
        packedClassName: function () {
            var name   = this.meta.className();
            var parts  = name.split(".");
            return parts.join("::");
        }
    },
    
    classMethods: {
        unpack: function (data) {
            var meta      = this.meta
            var me        = meta.instantiate();
            var seenClass = false;
            Joose.O.each(data, function (value,name) {
                if(name == "__CLASS__") {
                    var className = Joose.Storage.Unpacker.packedClassNameToJSClassName(value)
                    if(className != me.meta.className()) {
                        throw new Error("Storage data is of wrong type "+className+". I am "+me.meta.className()+".")
                    }
                    seenClass = true
                    return
                }
                me[name] = value
            })
            if(!seenClass) {
                throw new Error("Serialized data needs to include a __CLASS__ attribute.: "+data)
            }
            
            if(me.meta.can("finishUnpack")) {
                me.finishUnpack()
            }
            
            return me
        }
    }
    
})