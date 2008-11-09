(function (Class) {

Class("Joose.Storage.Unpacker", {
    classMethods: {
        unpack: function (data) {
            var name = data.__CLASS__;
            if(!name) {
                throw("Serialized data needs to include a __CLASS__ attribute.")
            }
            var jsName = this.packedClassNameToJSClassName(name)
            
            var co  = this.meta.classNameToClassObject(jsName);
            
            var obj = co.unpack(data);
            
            var id;
            if(Joose.Storage.CACHE && (id = data.__ID__)) {
                Joose.Storage.CACHE[id] = obj
            }
            
            return obj
        },
        
        // Format My::Class::Name-0.01 We ignore the version
        packedClassNameToJSClassName: function (packed) { 
            var parts  = packed.split("-");
            parts      = parts[0].split("::");
            return parts.join(".");
        },
        
        jsonParseFilter: function (key, value) {
            if(value != null && typeof value == "object") {
                if(value.__CLASS__) {
                    return Joose.Storage.Unpacker.unpack(value)
                }
                if(value.__ID__) {
                    return Joose.Storage.CACHE[value.__ID__]
                }
            }
            return value
        },
        
        patchJSON: function () {
            var orig = JSON.parse;
            var storageFilter = this.jsonParseFilter
            JSON.parse = function (s, filter) {
                Joose.Storage.CACHE = {}
                return orig(s, function JooseJSONParseFilter (key, value) {
                    var val = value;
                    if(filter) {
                        val = filter(key, value)
                    }
                    return storageFilter(key,val)
                })
            }
            
            var stringify = JSON.stringify;
            JSON.stringify = function () {
                Joose.Storage.TEMP_SEEN = {}
                return stringify.apply(JSON, arguments)
            }
        }
    }
})



Class("Joose.Storage.Unpacker.jsonpickle", {
    isa: Joose.Storage.Unpacker,
    classMethods: {
        unpack: function (data) {
            var name = data.classname__;
            if(!name) {
                throw("Serialized data needs to include a classname__ attribute.")
            }
            var jsName = this.packedClassNameToJSClassName(name, data.classmodule__)
            
            var co  = this.meta.classNameToClassObject(jsName);
            
            var obj = co.unpack(data);
            
            var id;
            if(Joose.Storage.CACHE && (id = data.objectid__)) {
                Joose.Storage.CACHE[id] = obj
            }
            
            return obj
        },
        
        // Format My::Class::Name-0.01 We ignore the version
        packedClassNameToJSClassName: function (className, moduleName) { 
            var name = "";
            if(moduleName) {
                name += moduleName + "."
            }
            name += className;
            return name
        },
        
        jsonParseFilter: function (key, value) {
            if(value != null && typeof value == "object") {
                if(value.classname__) {
                    return Joose.Storage.Unpacker.jsonpickle.unpack(value)
                }
                if(value.objectid__) {
                    return Joose.Storage.CACHE[value.objectid__]
                }
            }
            return value
        }
    }
})

})(JooseClass);
