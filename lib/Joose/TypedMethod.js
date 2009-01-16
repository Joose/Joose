(function (Class, Type) {

Class("Joose.TypedMethod", {
    isa: Joose.Method,
    
    has: {
        types: {
            isa: Joose.Types.Array,
            is:  "rw",
            init: function () { return [] }
        },
        
        typeCheckers: {
            init: function () { return [] }
        }
    },
    
    after: {
        setTypes: {
            var typeCheckers = [];
            
            Joose.A.each(this.getTypes(), function (type, index) {
                if(type === null) {
                    // if there is no type in a spot, dont push a type checker
                    typeCheckers.push(null)
                } else {
                    typeCheckers.push(Joose.TypeChecker.makeTypeChecker(type, "parameter", i))
                }
            })
            
            this.setTypeCheckers(typeCheckers)
        }
    },
    
    methods: {
        wrapTypeChecker: function() {
            var self = this;
            return function typeCheckMethod () {
                var checkers = self.getTypeCheckers();
                var args = [];
                // iterate over type checkers and arguments
                for(var i = 0, len = type.length; i < len; ++i) {
                    var checker = checkers[i]
                    if(checker !== null) {
                        var argument = arguments[i]
                        args[i]      = checker(i)
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
    }

})

})(JooseClass, JooseType);
