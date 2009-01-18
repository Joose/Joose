load('bootstrap_rhino.js');
var t = new Test.TAP.Class();
t.plan(4);

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

var dispatchMe = function( args ) {
    for (var item in dispatcher.foo) {
        var method = dispatcher.foo[item];
        var sig = method.signature;
        var matches = 0;
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
                return method.fun.apply(method, args);
        }
    }
};

t.is(dispatchMe([]), 'foo', 'disptched on no arguments ok');
t.is(dispatchMe([new Object()]), 'fooObject', 'dispatched on Object ok');
t.is(dispatchMe([new Array()]), 'fooArray', 'dispacthed on Array ok');
t.is(dispatchMe(["bar"]), 'fooString', 'dispatched on String ok');
t.is(dispatchMe(["bar", function() {}]), 'fooStringFunc', 'dispatched on String and Function ok');

