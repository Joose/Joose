Class("Joose.Storage.Unpacker", {
    classMethods: {
        unpack: function (data) {
            var name = data.__CLASS__;
            if(!name) {
                throw("Serialized data needs to include a __CLASS__ attribute.")
            }
            var jsName = this.packedClassNameToJSClassName(name)
            
            var co = this.meta.classNameToClassObject(jsName);
            
            return co.unpack(data)
        },
        
        // Format My::Class::Name-0.01 We ignore the version
        packedClassNameToJSClassName: function (packed) { 
            var parts  = packed.split("-");
            parts      = parts[0].split("::");
            return parts.join(".");
        },
        
        jsonParseFilter: function (key, value) {
            if(value != null && typeof value == "object" && value.__CLASS__) {
                return Joose.Storage.Unpacker.unpack(value)
            }
            return value
        },
        
        patchJSON: function () {
            var orig = JSON.parse;
            JSON.parse = function (s, filter) {
                return orig(s, function (key, value) {
                    var val = value;
                    if(filter) {
                        val = filter(key, value)
                    }
                    return Joose.Storage.Unpacker.jsonParseFilter(key,val)
                })
            }
        }
    }
})