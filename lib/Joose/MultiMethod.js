Module('Joose.Type', function() {
    Type('MethodPatternList', {
        uses: Joose.Type.Array,
        where: function(p) {
            var ok = 0;
            for (var i in p) {
                var pattern = p[i];
                if (pattern.signature instanceof Array
                    && typeof pattern.method == 'function') {
                    ok++;
                }
            }
            return p.length == ok;
        }
    });
});

Class('Joose.MultiMethod', {
    isa: Joose.Method,
    meta: Joose.Class,
    
    has: {
        patterns: {
            is: 'rw',
            isa: Joose.Type.MethodPatternList,
            init: function() { return [] }
        }
    },
   
    override: {
        copy: function() {
            var self = this.SUPER();
            var patternCopy = [].concat(this.getPatterns());
            self.setPatterns( patternCopy );
            return self;
        }
    },

    methods: {
        // return the correct signature for
        // our argument list or a function that 
        // will throw an error
        getFunForSignature: function() {
            var args = arguments;
            var self = this;
            var patterns = self.getPatterns();
            for (var item in patterns) {
                if(patterns.hasOwnProperty(item)) {
                    var method = patterns[item];
                    var sig = method.signature;
                    var matches = 0;
                    if (sig.length == args.length) {
                        if (sig.length > 0) {
                            for (var i=0; i < sig.length; i++) {
                                if (sig[i] instanceof Joose.TypeConstraint
                                    && sig[i].validateBool(args[i])) {
                                        matches++;
                                } else if (sig[i] instanceof Object 
                                    && args[i] instanceof sig[i]) {
                                        matches++;
                                } else if (args[i] == sig[i]) {
                                    matches++;
                                }
                            }
                        }
                        if (matches == sig.length)
                            return method.method;
                    }
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
            //TODO(jwall): perform caching of method returns?
            return function() {
                var myself = this;
                var args = arguments;
                var fun = self.getFunForSignature.apply(self, args);
                return fun.apply(myself, args);
            }
        }
    },
    classMethods: {
        newFromPatterns: function(name, patterns) {
            method = new Joose.MultiMethod(name, function() {}, {});
            method.setPatterns(patterns);
            return method;
        }
    }
});
