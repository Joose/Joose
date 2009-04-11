(function (Type) {
    Type('Any', {
        // Returns true for any type
        where: function(o) {
            return true
        }
    });


    Type('Null', {
        uses: Joose.Type.Any,
        where: function(o) {
            if (o === null) {
                return true;
            }
            return false;
        }
    });
    
    Type('NotNull', {
        uses: Joose.Type.Any,
        where: function(o) {
            if (o === null) {
                return false;
            }
            return true;
        }
    });

    Type('Enum', {
        uses: Joose.Type.NotNull,
        message: function(v) {
            return "The passed value ["+v+"] is not "+
                   (this.getProps().strictMatch?"*strictly* ":"")+
                   "one of ["+this.getProps().values.join(",")+"]";
        },
        where: function (v) {
            var self  = this;
            var props  = self.getProps()
            if ( !props || props.values === undefined || !(props.values instanceof Array)) {
                throw "Enum Type needs Array of values in 'values' property of Type declaration"
            }
            var eq = function(vv) {
                if (props.strictMatch === true) return (vv === v);
                return (vv == v);
            }
            if ( Joose.A.grep(props.values, eq).length != 0 ) {
                return true;
            }
            return false;
        }
    });

    Type('Obj', {
        uses: Joose.Type.NotNull,
        where: function (o) {
            if ( o instanceof Object ) {
                return true;
            }
            return false;
        }
    });

    Type('Str', {
        uses: Joose.Type.NotNull,
        where: function(S) {
            if ( typeof S == 'string' || S instanceof String ) {
                return true;
            }
            return false
        },
        coerce: [{
            from: Joose.Type.Any,
            via:  function (value) {
                if(value == null) {
                    return ""
                } else {
                    return "" + value
                }
            }
        }]
    });

    Type('Num', {
        uses: Joose.Type.NotNull,
        where: function(N) {
            if ( typeof N == 'number' || N instanceof Number ) {
                return true;
            }
            return false
        },
        coerce: [{
            from: Joose.Type.Str,
            via:  function (value) {
                if(value == null || value == "") return undefined;
                // TODO parse for valid format
                return parseFloat(value, 10)
            }
        }]
    });

    Type('Bool', {
        uses: Joose.Type.NotNull,
        where: function(B) {
            if (B === true || B === false) {
                return true;
            }
            return false;
        },
        coerce: [{
            from: Joose.Type.Any,
            via:  function (value) {
                if(value == null || value === "") return false;
                if(value == 1 || value == "1" || value == "true") {
                    return true
                }
                if(value == 0 || value == "0" || value == "false" ) {
                    return false
                }
                return null
            }
        }]
    });

    Type('Int', {
        uses: Joose.Type.Num,
        where: function(n) {
            var sn = String(n);
            if ( sn.match(/^\d*\.\d$/) ) {
                return false;
            }
            return true;
        },
        coerce: [{
            from: Joose.Type.Str,
            via:  function (value) {
                if(value == null || value == "") return undefined;
                if(value.match(/^-{0,1}\d+$/)) {
                    return parseInt(value, 10)
                }
                return
            }
        }]
    });

    //TODO(jwall): Float is starting to look superfluous Floats are a superset of Int
    //and javascript has no good way to differentiate between Num and Float
    //It's only benefit is semantic sugar. Joose.Type.Float = Joose.Type.Num?
    Type('Float', {
        uses: Joose.Type.Num,
        where: function(n) {
            return true
        }
    });

    Type('Func', {
        uses: Joose.Type.Obj,
        where: function (f) {
            if ( typeof f == 'function' ) {
                return true;
            }
            return false;
        }
    });

    Type('Array', {
        uses: Joose.Type.Obj,
        where: function (A) {
            if ( Object.prototype.toString.call(A) === '[object Array]' ) {
                return true;
            }
            return false;
        }
    });

    Type('Date', {
        uses: Joose.Type.Obj,
        where: function (D) {
            if ( D instanceof Date ) {
                return true;
            }
            return false;
        },
        coerce: [{
            from: Joose.Type.Str,
            via:  function (value) {
                var match;
                if(value == undefined || value == "") {
                    return undefined;
                } else if(match = value.match(/\s*(\d+)-(\d+)-(\d+)/)) {
                    return new Date(match[1], match[2]-1, [match[3]])
                }
                return null
            }
        }]
    });

    Type('Joose', {
        uses: Joose.Type.Obj,
        where: function (o) {
            //TODO not sure if this is correct yet.
            if ( o.meta && o.meta.meta.isa(Joose.Class) ) {
                return true;
            }
            return false;
        }
    });    
})(JooseType);
