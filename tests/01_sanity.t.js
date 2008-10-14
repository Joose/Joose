var r = new Test.TAP.Runner();

var testobj = {name: 'Sanity'};

testobj.runtests = function() {
    var t = new Test.TAP();
    t.plan(12)
    t.diag("Sanity")
    t.ok(Joose,   "Joose is here");
    t.ok(Joose.Builder,   "We have a builder");
    t.ok(joose,  "joose is here");
    t.ok(joose.init, "joose has an init method :)")
    
    t.ok(Joose.Class, "Joose.Class is here")
    t.ok(Joose.Role, "Joose.Role is here")
    // TODO test for all components
        
    t.diag("Builders");
    t.ok(Class, "Class");
    t.ok(joosify, "isa")
    t.ok(Module, "has")
    t.ok(rw == "rw", "rw prop");
    t.ok(ro == "ro", "ro prop");
    
    t.diag("Test object traversion order") // this is very important for builders
    var OK = true;
    for(var i = 0; i < 100; i++) {
        var test = {
            b: 1,
            d: 2,
            a: 3,
            z: 4
        }
        var s = "";
        for(var n in test) {
            s += test[n]
        }
        if(s != "1234") {
            OK = false
        }
    }
    
    t.ok(OK, "Object traversion order is in declaration order")
    
    return t;
};

r.run_tests(testobj);
r;
