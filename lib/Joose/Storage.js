


Class("Joose.Storage", {
    meta: Joose.Role,
    
    methods: {
        // gets called by the JSON.stringify method
        toJSON: function () {
        	// Evil global var TEMP_SEEN. See Joose.Storage.Unpacker.patchJSON
            return this.pack(Joose.Storage.TEMP_SEEN)
        },
        
        // Generate an object identity (a unique integer for this object
        // This is cached in a property called __IDENTITY__
        // Override this in object representing values
        identity: function () {
        	if(this.__ID__) {
        		return this.__ID__
        	} else {
        		return this.__ID__ = Joose.Storage.OBJECT_COUNTER++
        	}
        },
        
        pack: function (seen) {
            
            
            if(seen) {
            	var id = this.identity()
            	var obj;
            	if(obj = seen[id]) {
            		return {
            			__ID__: id
            		}
            	}
            }
            
            if(this.meta.can("prepareStorage")) {
                this.prepareStorage()
            }
            
            if(seen) {
            	seen[this.identity()] = true
            }
            
            var o  = {
                __CLASS__: this.packedClassName(),
                __ID__:    this.identity()
            };
            var me        = this;
            
            var attrs      = this.meta.getAttributes();
            
            Joose.O.each(attrs, function packAttr (attr, name) {
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
            Joose.O.each(data, function unpack (value,name) {
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

Joose.Storage.OBJECT_COUNTER = 1;