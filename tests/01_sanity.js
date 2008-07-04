

plan(12)
diag("Sanity")
ok(Joose,   "Joose is here");
ok(Joose.Builder,   "We have a builder");
ok(joose,  "joose is here");
ok(joose.init, "joose has an init method :)")

ok(Joose.Class, "Joose.Class is here")
ok(Joose.Role, "Joose.Role is here")
// TODO test for all components
    
diag("Builders");
ok(Class, "Class");
ok(joosify, "isa")
ok(Module, "has")
ok(rw == "rw", "rw prop");
ok(ro == "ro", "ro prop");

diag("Test object traversion order") // this is very important for builders
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

ok(OK, "Object traversion order is in declaration order")

endTests()