Class("Joose.TypeConstraint", {
    has: {
        _constraints: {
            is: "ro",
            init: function () { return [] }
        },
        _coercions: {
            is: "ro",
            init: function () { return [] }
        },
        _messages: {
            is: "ro",
            init: function () { return [] }
        },
        _callback: {
            is: "ro",
            init: function() {
                return function (msg) {
                    throw new ReferenceError(msg);
                };
            }
        },
        _name: {
            is: "ro"
        },
        _uses: {
            is: "ro",
        },
    },
    
    classMethods: {
        newFromTypeBuilder: function (name, props) {
            var t = new Joose.TypeConstraint({ name: name });
            if ( props.uses 
                 && typeof props.uses.meta != 'undefined'
                 && props.uses.meta.isa(Joose.TypeConstraint) ) {
                 t._uses = props.uses;
            }

            if(props.where) {
                t.addConstraint(props.where)
            }
            
            if(props.coerce) {
                for(var i = 0; i < props.coerce.length; i++) {
                    var coercionProps = props.coerce[i];
                    t.addCoercion(new Joose.TypeCoercion({
                        from: coercionProps.from,
                        via:  coercionProps.via
                    }))
                }
            }
            
            return t
        }
    },
    
    methods: {
        
        stringify: function () {
            return this._name
        },
        
        makeSubType: function (name) {
            var t = new Joose.TypeConstraint({ name: name })
            Joose.A.each(this._constraints, function (con) {
                t.addConstraint(con)
            })
            return t
        },
        
        addCoercion: function (coercion) {
            this._coercions.push(coercion);
        },
        
        addConstraint: function (func, message) {
            this._constraints.push(func);
            this._messages.push(message)
        },
        
        getConstraintList: function () {
            var cons = this._constraints;
            if ( this._uses ) {
                var parentcons = this._uses.getConstraintList();
                return parentcons.concat(cons);
            }
            return cons;
        },
        
        getMessageList: function () {
            var msg = this._messages;
            if ( this._uses ) {
                var parentmsg = this._uses.getMessageList();
                return parentmsg.concat(msg);
            }
            return msg;
        },

        validateBool: function (value) {
            var i = this._validate(value);
            if(i == -1) {
                return true
            }
            return false
        },
        
        validate: function (value) {
            var i = this._validate(value);
            if(i == -1) {
                return true
            }
            var messages = this.getMessageList();
            var message = messages[i] 
                || "The passed value ["+value+"] is not a "+this;
            this._callback(message);
        },
        
        _validate: function (value) {
            var con = this.getConstraintList();
            var i, len;
            for(i = 0, len = con.length; i < len; i++) {
                var func = con[i];
                var result = false;
                if(func instanceof RegExp) {
                    result = func.test(value)
                } else {
                    result = func.call(this, value)
                }
                
                if(!result) {
                    return i
                    
                }
            }
            return -1
        },

        coerce: function (value) {
            if(this.validateBool(value)) {
                return value
            }
            //alert("in constraints coerce call: "+value);
            var coercions = this._coercions;
            for(var i = 0, len = coercions.length; i < len; i++) {
                var coercion = coercions[i];
                var result   = coercion.coerce(value);
                if(result != null) {
                    return result
                }
            }
            return null
        }
    }
});

Type('Any', {
    where: function(o) {
        if ( typeof o != 'undefined' ) {
            return true;
        }
        return false;
    }
});

Type('Null', {
    uses: TYPE.Any,
    where: function(o) {
        if (o === null) {
            return true;
        }
        return false;
    }
});

Type('Obj', {
    uses: TYPE.Any,
    where: function (o) {
        if ( o instanceof Object ) {
            return true;
        }
        return false;
    }
});

Type('Str', {
    uses: TYPE.Any,
    where: function(S) {
        if ( typeof S == 'string' || S instanceof String ) {
            return true;
        }
        return false
    }
});

Type('Num', {
    uses: TYPE.Any,
    where: function(N) {
        if ( typeof N == 'number' || N instanceof Number ) {
            return true;
        }
        return false
    }
});

Type('Bool', {
    uses: TYPE.Any,
    where: function(B) {
        if (B === true || B === false) {
            return true;
        }
        return false;
    }
});

Type('Int', {
    uses: TYPE.Num,
    where: function(n) {
        var sn = String(n);
        if ( sn.match(/^\d*\.\d$/) ) {
            return false;
        }
        return true;
    }
});

//TODO(jwall): Float is starting to look superfluous Floats are a superset of Int
//and javascript has no good way to differentiate between Num and Float
//It's only benefit is semantic sugar. TYPE.Float = TYPE.Num?
Type('Float', {
    uses: TYPE.Num,
    where: function(n) {
        return true
    }
});

Type('Func', {
    uses: TYPE.Obj,
    where: function (f) {
        if ( typeof f == 'function' ) {
            return true;
        }
        return false;
    }
});

Type('Array', {
    uses: TYPE.Obj,
    where: function (A) {
        if ( A instanceof Array ) {
            return true;
        }
        return false;
    }
});

Type('Date', {
    uses: TYPE.Obj,
    where: function (D) {
        if ( D instanceof Date ) {
            return true;
        }
        return false;
    }
});

Type('Joose', {
    uses: TYPE.Obj,
    where: function (o) {
        //TODO not sure if this is correct yet.
        if ( o.meta && o.meta.meta.isa(Joose.Class) ) {
            return true;
        }
        return false;
    }
});

