Module('JooseX.Type', function() {
    Type('MethodPatternList', {
        uses: Joose.Type.Array,
        where: function(p) {
            var ok = 0;
            for (var i in p) {
                var pattern = p[i];
                if (pattern.signature instanceof Array
                    && typeof pattern.fun == 'function') {
                    ok++;
                }
            }
            return p.length == ok;
        }
    });
});

Class('JooseX.MultiMethod', {
    isa: Joose.Method,
    
    has: {
        patterns: {
            is: 'rw',
            isa: JooseX.Type.MethodPatternList,
            init: function() { return [] }
        }
    },
    
    methods: {
        // return the correct signature for
        // our argument list or a function that 
        // will throw an error
        getFunForSignature: function() {
            var args = arguments;
            var self = this;
            for (var item in self.getPatterns()) {
                var method = self.getPatterns()[item];
                var sig = method.signature;
                var matches = 0;
                //TODO(jwall): perform caching of method returns?
                if (sig.length == args.length) {
                    if (sig.length > 0) {
                        for (var i=0; i < sig.length; i++) {
                            if (sig[i] instanceof Joose.TypeConstraint) {
                                if (sig[i].validateBool(args[i])) {
                                    matches++;
                                }
                            } else {
                                if (args[i] instanceof sig[i])
                                    matches++;
                            }
                        }
                    }
                    if (matches == sig.length)
                        return method.fun;
                }
            }
            return function () {
                    throw new ReferenceError("multi-method type method call " 
                        +"with no matching signature");
                };
        },
        // returns a closure that will always dispatch on the correct method
        // for our signature but can be attached to an object as a method
        asFunction: function() {
            var self = this;
            return function() {
                var myself = this;
                var args = arguments;
                var fun = self.getFunForSignature.apply(self, args);
                return fun.apply(myself, args);
            }
        }
    }
});
