(function() {
var t = new Test.TAP.Class();
t.plan(15)

t.testJoosify = function() {
    var self = this;
    self.diag("joosify");
    
    function RegularClass() {
        this.a = 1;
        this.b = 2;
    }
    
    RegularClass.prototype = {
        para: "test",
        test: function () { return "world" }
    }
    
    
    joosify("RegularClass", RegularClass);
    
    self.ok(RegularClass, "RegularClass is still there")
    self.ok(RegularClass.meta, "RegularClasses now have a meta object")
    var a = new RegularClass();
    self.ok(a, "We can make a joosified class");
    
    self.ok(a.meta, "RegularClass objects now have a meta class")
    self.ok(a.para == "test", "Attributes are still there")
    self.ok(a.test, "Test function is there");
    self.ok(a.test() == "world", "Test Function is callable")
    self.ok(a.meta.can("test"), "The meta class is aware of the test function")
    self.ok(a.meta.isa(RegularClass), "A RegularClass isa RegularClass")
}

t.testBootstrap = function() {
    var self = this;
    self.diag("Bootstrap");
    
//    self.ok(Joose.Method.meta.getAttribute("_props"), "Joose.Method has attribute _props")
    self.ok(Joose.Method.meta.getAttribute("_name"), "Joose.Method has attribute _name")
    self.ok(Joose.Method.meta.getAttribute("_body"), "Joose.Method has attribute _body")
    
    self.ok(Joose.Attribute.meta.getAttribute("_props"), "Joose.Attribute has attribute _props")
    self.ok(Joose.Attribute.meta.getAttribute("_name"), "Joose.Attribute has attribute _name")
    
    self.ok(Joose.Method.meta.meta.className()    == "Joose.Class", "Joose.Method's meta class is of correct type")
    self.ok(Joose.Attribute.meta.meta.className() == "Joose.Kernel.MetaClass", "Joose.Attribute's meta class is of correct type")
}

return t;
})()
