(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(18)

t.testRoles = function() {
    var self = this;
    self.diag("Joose.Kernel.ProtoRole")
    
    this.ok(Joose.Kernel.ProtoRole, "Joose.Kernel.ProtoRole is here");
    
    var comparableMeta = new Joose.Kernel.ProtoRole('Comparable');
    var Comparable = comparableMeta.getClassObject(); 
    
    self.ok(Comparable, "We can make a Role");
    self.throws_ok( function () {new Comparable()}, /Roles may not be instantiated./, "Roles cannot be instantiated.")
    self.ok(Comparable.meta.meta.isa(Joose.Kernel.ProtoRole), "Our meta class isa ProtoRole")
    
    
    var Eq = (new Joose.Kernel.ProtoRole('Eq')).getClassObject();
    Eq.meta.extend({
        locale : null,
        
        notEqual: function (para) {
            return !this.isEqual(para)
        }
    });
    Eq.meta.addRequirement('isEqual');
    
    
    
    var Currency = (new Joose.Kernel.Roles("Currency")).getClassObject();
    Currency.meta.addRole(Eq);
    Currency.meta.extend({
        value : null,
        initialize : Joose.emptyFunction,
        isEqual: function (cur) {
            return this.value == cur.value
        }    
    });
    Eq.meta.applyMethodModifiers(Currency);
    
    self.ok(Currency.meta.does(Eq), "does works for roles");
    
    var SubCurrency = (new Joose.Kernel.Roles("SubCurrency")).getClassObject();
    SubCurrency.meta.addSuperClass(Currency);
    
    var TestClass = (new Joose.Kernel.Roles("TestClass")).getClassObject();
    TestClass.meta.extend({
        initialize : Joose.emptyFunction,
        orig: function () {
            return true
        }
    });
    
    Currency.meta.validateClass()
    
    var a = new Currency(); a.value = 1;
    var b = new Currency(); b.value = 1;
    var c = new Currency(); c.value = 2;
    
    self.ok(a.meta.getAttribute('locale'), 'the locale attribute is in the attribute list');
    a.locale = 'en_us';
    self.is(a.locale, 'en_us', 'the locale attribute was added also'); 
    self.ok(a.isEqual(b), "Equality works")
    self.ok(b.isEqual(a), "Equality works in both directions")
    self.ok(!a.isEqual(c), "Equality works for unequal things")
    
    self.ok(a.meta.can("notEqual"), "notEqual method arrived")
    self.ok(a.notEqual(c), "Role composition works and notEqual works")
    self.ok(!a.notEqual(b), "Role composition works and notEqual works for equal things")
    
    self.ok(a.meta.does(Eq), "Class object does Role")
    self.ok(Currency.meta.does(Eq), "Class does Role")
    self.ok(!TestClass.meta.does(Eq), "TestClass doesnt do Role")
    self.ok(!new TestClass().meta.does(Eq), "TestClass object doesnt do Role")
    
    self.ok(SubCurrency.meta.does(Eq), "does works for inherited roles")
}
return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype);
