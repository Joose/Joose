Joose.Class.create('Joose.TypeConstraint', {
    
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
            is: "ro"
        },
        props: {
            is: "rw"
        }
    },
    
    classMethods: {
        // name is name of type
        // props may include: uses (Supertype), where (func) and coerce
        create: function (name, props) {
            var element = Joose.Kernel.ProtoModule.prepareNamespace(name);
            var parent  = element.meta.parent;
            var localName = element.meta.localName;
            
            parent.meta.removeElement(localName);
            var t = new Joose.TypeConstraint({ name: name });
            parent.meta.addElement(localName,t);
            
            if ( props.uses 
                 && typeof props.uses.meta != 'undefined'
                 && props.uses.meta.isa(Joose.TypeConstraint) ) {
                 t._uses = props.uses;
            }

            if(props.where) {
                t.addConstraint(props.where, props.message)
            }

            t.setProps(props)
            
            // coerce needs props from (Type) and via (func that takes current value as para and returns coerced value)
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
                ? messages[i].call(this,value): "The passed value ["+value+"] is not a "+this;
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
                if(result !== null) {
                    return result
                }
            }
            return null
        }
    }
});
