

(function (Class, Role) {

Role("Joose.Storage", {
    
    methods: {
        // gets called by the JSON.stringify method
        toJSON: function () {
            // Evil global var TEMP_SEEN. See Joose.Storage.Unpacker.patchJSON
            var packed = this.pack(Joose.Storage.TEMP_SEEN);
            
            return packed;
        },
        
        // Generate an object identity (a unique integer for this object
        // This is cached in a property called __ID__
        // Override this in object representing values
        identity: function () {
            if(this.__ID__) {
                return this.__ID__
            } else {
                return this.__ID__ = Joose.Storage.OBJECT_COUNTER++
            }
        },
        
        pack: function (seen) {
            return this.meta.c.storageEngine().pack(this, seen)
        }
    },
    
    classMethods: {
        
        storageEngine: function () {
            return Joose.Storage.Engine
        },
        
        unpack: function (data) {
            return this.storageEngine().unpack(this, data)
        }
    }
    
})



Role("Joose.Storage.jsonpickle", {
    does: Joose.Storage,
    
    classMethods: {
        storageEngine: function () {
            return Joose.Storage.Engine.jsonpickle
        }
    }
})

Joose.Storage.OBJECT_COUNTER = 1;

// This storage engine is base on MooseX::Storage: http://search.cpan.org/~nuffin/MooseX-Storage-0.14/lib/MooseX/Storage.pm
Class("Joose.Storage.Engine", {
    
    classMethods: {
        
        pack: function (object, seen) {
            
            
            if(seen) {
                var id  = object.identity()
                var obj = seen[id];
                if(obj) {
                    return {
                        __ID__: id
                    }
                }
            }
            
            if(object.meta.can("prepareStorage")) {
                object.prepareStorage()
            }
            
            if(seen) {
                seen[object.identity()] = true
            }
            
            var o  = {
                __CLASS__: this.packedClassName(object),
                __ID__:    object.identity()
            };
            
            var attrs      = object.meta.getAttributes();
            
            Joose.O.eachSafe(attrs, function packAttr (attr, name) {
                if(attr.isPersistent()) {
                    o[name]   = object[name];
                }
            });
            
            return o
        },
        
        unpack: function (classObject, data) {
            var meta      = classObject.meta
            var me        = meta.instantiate();
            var seenClass = false;
            Joose.O.eachSafe(data, function unpack (value,name) {
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
            
            // Unpacked id may come from another global counter and thus must be discarded
            delete me.__ID__
            
            if(me.meta.can("finishUnpack")) {
                me.finishUnpack()
            }
            
            return me
        },
        
        packedClassName: function (object) {
            if(object.meta.can("packedClassName")) {
                return object.packedClassName();
            }
            var name   = object.meta.className();
            var parts  = name.split(".");
            return parts.join("::");
        }
    }
    
})

Class("Joose.Storage.Engine.jsonpickle", {
    
    classMethods: {
        
        pack: function (object, seen) {
            
            
            if(seen) {
                var id  = object.identity()
                var obj = seen[id];
                if(obj) {
                    return {
                        objectid__: id
                    }
                }
            }
            
            if(object.meta.can("prepareStorage")) {
                object.prepareStorage()
            }
            
            if(seen) {
                seen[object.identity()] = true
            }
            
            var o  = {
                classname__:   this.packedClassName(object),
                classmodule__: this.packedModuleName(object),
                objectid__:    object.identity()
            };
            
            var attrs      = object.meta.getAttributes();
            
            Joose.O.eachSafe(attrs, function packAttr (attr, name) {
                if(attr.isPersistent()) {
                    o[name]   = object[name];
                }
            })
  
            return o
        },
        
        unpack: function (classObject, data) {
            var meta      = classObject.meta
            var me        = meta.instantiate();
            var seenClass = false;
            Joose.O.eachSafe(data, function unpack (value,name) {
                if(name == "classname__") {
                    var className = value;
                    var module    = data.classmodule__
                    if(module) {
                        className = "" + module + "." + value
                    }
                    if(className != me.meta.className()) {
                        throw new Error("Storage data is of wrong type "+className+". I am "+me.meta.className()+".")
                    }
                    seenClass = true
                    return
                }
                if(name == "classmodule__") {
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
        },
        
        packedClassName: function (object) {
            var name   = object.meta.className();
            var parts  = name.split(".");
            return parts.pop()
        },
        
        packedModuleName: function (object) {
            var name   = object.meta.className();
            var parts  = name.split(".");
            parts.pop();
            return parts.join(".");
        }
    }
    
})

Joose.Storage.storageEngine            = Joose.Storage.Engine
Joose.Storage.jsonpickle.storageEngine = Joose.Storage.Engine.jsonpickle

})(JooseClass, JooseRole);
