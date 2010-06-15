load('bootstrap_rhino.js');
var t = new Test.TAP.Class();
t.plan(5);

var dispatcher = {
    foo : [
        {
            signature : [],
            fun       : function() {
                return "foo";
            }
        },
        {
            signature : [TYPE.Str],
            fun       : function() {
                return "fooString";
            }
        },
        {
            signature : [Array],
            fun       : function() {
                return "fooArray";
            }
        },
        {
            signature : [TYPE.Str, TYPE.Func],
            fun       : function() {
                return "fooStringFunc";
            }
        },
        {
            signature : [Object],
            fun       : function() {
                return "fooObject";
            }
        }
    ]
};

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
    //isa: Joose.Method,
    
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
                var method = dispatcher.foo[item];
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
        asClosure: function() {
            var self = this;
            t.diag("creating the closure");
            return function() {
                var myself = this;
                var args = arguments;
                var fun = self.getFunForSignature.apply(self, args);
                return fun.apply(myself, args);
            }
        }
    }
});

var patternMethod = new JooseX.MultiMethod({patterns: dispatcher.foo});
patternMethod.setPatterns(dispatcher.foo);

var fun = patternMethod.getFunForSignature();
t.is(fun(), 'foo', 'got the fun for empty argument list ok');
fun = patternMethod.getFunForSignature(new Object());
t.is(fun(), 'fooObject', 'got the fun for an Object argument ok');
var closureFun = patternMethod.asClosure();
t.is(closureFun(), 'foo', 'closure dispatches on empty argument');
t.is(closureFun(new Object()), 'fooObject', 'closure dispatches on Object argument');
t.dies_ok(function() { closureFun(1,2,3) }, 'when there is no signature the method will error');

