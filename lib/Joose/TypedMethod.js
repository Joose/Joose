(function (Class, Type) {

Class("Joose.TypedMethod", {
    isa: Joose.Method,
    meta: Joose.Class,
    
    has: {
        types: {
            isa: Joose.Type.Array,
            is:  "rw",
            init: function () { return [] }
        },
        
        typeCheckers: {
            init: function () { return [] }
        }
    },
    
    after: {
        setTypes: function () {
            var self         = this;
            var typeCheckers = [];
            var props        = this.getProps();
            
            Joose.A.each(this.getTypes(), function (type, index) {
                if(type === null) {
                    // if there is no type in a spot, dont push a type checker
                    typeCheckers.push(null)
                } else {
                    typeCheckers.push(Joose.TypeChecker.makeTypeChecker(type, props, "parameter", index))
                }
            })
            
            this.typeCheckers = typeCheckers
        }
    },
    
    override: {
        copy: function () {
            var self = this.SUPER();
            // copy types;
            var copy = [].concat(this.types)
            self.setTypes( copy ); 
            return self;
        }
    },
    
    methods: {
        
        wrapTypeChecker: function(body) {
            var self = this;
            return function typeCheckWrapper () {
                var checkers = self.typeCheckers;
                var args = [];
                // iterate over type checkers and arguments
                for(var i = 0, len = checkers.length; i < len; ++i) {
                    var checker = checkers[i]
                    if(checker !== null) {
                        var argument = arguments[i]
                        args[i]      = checker(argument)
                    } 
                    // If the type checker is null, dont type check
                    else {
                        args[i]      = arguments[i]
                    }
                }
                return body.apply(this, args)
            }
        },
        
        // Returns the function that will later be added to objects
        asFunction: function () {
            return this.wrapTypeChecker(this._body)
        }
    },
    
    classMethods: {
        newFromProps: function (name, props) {
            var method = props.method;
            if(typeof method !== "function") {
                throw new Error("Property method in method declaration ["+name+"] must be a function.")
            }
            var self   = this.meta.instantiate(name, method, props);
            self.setTypes(props.signature);
            return self;
        }
    }

})

})(JooseClass, JooseType);
