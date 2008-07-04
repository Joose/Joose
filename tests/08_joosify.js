plan(16)

diag("joosify");

function RegularClass() {
    this.a = 1;
    this.b = 2;
}

RegularClass.prototype = {
    para: "test",
    test: function () { return "world" }
}


joosify("RegularClass", RegularClass);

ok(RegularClass, "RegularClass is still there")
ok(RegularClass.meta, "RegularClasses now have a meta object")
var a = new RegularClass();
ok(a, "We can make a joosified class");

ok(a.meta, "RegularClass objects now have a meta class")
ok(a.para == "test", "Attributes are still there")
ok(a.test, "Test function is there");
ok(a.test() == "world", "Test Function is callable")
ok(a.meta.can("test"), "The meta class is aware of the test function")
ok(a.meta.isa(RegularClass), "A RegularClass isa RegularClass")

diag("Bootstrap");

ok(Joose.Method.meta.getAttribute("_props"), "Joose.Method has attribute _props")
ok(Joose.Method.meta.getAttribute("_name"), "Joose.Method has attribute _name")
ok(Joose.Method.meta.getAttribute("_body"), "Joose.Method has attribute _body")

ok(Joose.Attribute.meta.getAttribute("_props"), "Joose.Attribute has attribute _props")
ok(Joose.Attribute.meta.getAttribute("_name"), "Joose.Attribute has attribute _name")

ok(Joose.Method.meta.meta.className()    == "Joose.Class", "Joose.Method's meta class is of correct type")
ok(Joose.Attribute.meta.meta.className() == "Joose.Class", "Joose.Attribute's meta class is of correct type")

endTests()
