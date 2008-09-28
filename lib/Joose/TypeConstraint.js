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
            if ( props.isa 
                 && typeof props.isa.meta != 'undefined'
                 && props.isa.meta.isa(Joose.TypeConstraint) ) {
                 t._uses = props.isa;
                 //t = props.isa.makeSubType(name);

            } else {
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
            var message = this._messages[i];
            if(message) {
                throw new ReferenceError(message.apply(this, value))
            }
            throw new ReferenceError("The passed value ["+value+"] is not a "+this)
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
    isa: TYPE.Any,
    where: function(o) {
    }
});

Type('Obj', {
    isa: TYPE.Any,
    where: function (o) {
        if ( o instanceof Object ) {
            return true;
        }
        return false;
    }
});

Type('Num', {
    //isa: Type.Any,
    where: function(n) {
    }
});

Type('Int', {
    //isa: Type.Num,
    where: function(n) {
    }
});

Type('Float', {
    //isa: Type.Num,
    where: function(n) {
    }
});

Type('Str', {
    //isa: Type.Any,
    where: function(S) {
    }
});

Type('Bool', {
    //isa: Type.Any,
    where: function(S) {
    }
});

Type('Func', {
    //isa: Type.Obj,
    where: function (f) {
    }
});

Type('Array', {
    //isa: Type.Obj,
    where: function (f) {
    }
});

Type('Literal', {
    //isa: Type.Obj,
    where: function (f) {
    }
});

Type('ArrayLiteral', {
    //isa: Type.Obj,
    where: function (f) {
    }
});

Type('ObjectLiteral', {
    //isa: Type.Obj,
    where: function (f) {
    }
});

Type('Joose', {
    //isa: Type.Obj,
    where: function (f) {
    }
});


