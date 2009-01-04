(function () {
var testobj = new Test.TAP.Class();
testobj.plan(1)

testobj.testSanity = function() {
    this.diag("Gene")
    this.ok(Joose.Kernel.GENE,   "GENE is here");
    this.ok(Joose.Kernel.GENE == Joose.Kernel.GENE.meta && Joose.Kernel.GENE.meta == Joose.Kernel.GENE.meta.meta, "GENE's meta is perfectly circular");
    this.ok(Joose.Kernel.GENE.meta.hasMethod('hasMethod'), "GENE's has hasMethod");
//    this.ok(Joose.Builder,   "We have a builder");
//    this.ok(joose,  "joose is here");
//    this.ok(joose.init, "joose has an init method :)")
//    
//    this.ok(Joose.Class, "Joose.Class is here")
//    this.ok(Joose.Role, "Joose.Role is here")
//    // TODO test for all components
//        
//    this.diag("Builders");
//    this.ok(Class, "Class");
//    this.ok(joosify, "isa")
//    this.ok(Module, "has")
//    this.ok(rw == "rw", "rw prop");
//    this.ok(ro == "ro", "ro prop");
//    
//    this.diag("Test object traversion order") // this is very important for builders
//    var OK = true;
//    for(var i = 0; i < 100; i++) {
//        var test = {
//            b: 1,
//            d: 2,
//            a: 3,
//            z: 4
//        }
//        var s = "";
//        for(var n in test) {
//            if(test.hasOwnProperty(n)) {
//                s += test[n]
//            }
//        }
//        if(s != "1234") {
//            OK = false
//        }
//    }
//    if(!joose.top.CHAOTIC_TRAVERSION_ORDER) {
//        this.ok(OK, "Object traversion order is in declaration order")
//    } else {
//        this.ok(true, "Using compatibility mode for JS engine that uses non deterministic object traversion order")
//    }
};

return testobj;
})()