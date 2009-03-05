(function () {
var testobj = new Test.TAP.Class();
testobj.plan(24)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Proto.Meta");
    
    this.ok(Joose.Proto.Meta, "Joose.Proto.Meta is here");
    

    //==================================================================================================================================================================================
    this.diag("Circularity");
    
    this.ok(Joose.Proto.Meta.meta == Joose.Proto.Meta.meta.meta, "Joose.Proto.Meta's meta is perfectly circular");
    
    
    //==================================================================================================================================================================================
    this.diag("Stringification");
    
    this.is(Joose.Proto.Meta,'Joose.Proto.Meta', "Joose.Proto.Meta stringified correctly");
    this.is("" + Joose.Proto.Meta.meta,'a Joose.Proto.Meta', "Joose.Proto.Meta's meta stringified correctly");
    
    
    //==================================================================================================================================================================================
    this.diag("Inheritance from Joose.Proto.Object");
    
    var TestClass = new Joose.Proto.Meta('TestClass', null, null, {
        inc : function (a) { return a + 1 }
    }).c;
    var testClass = new TestClass();
    
    this.ok(true, "Initialized was inherited from Joose.Proto.Object");
    
    
    //==================================================================================================================================================================================
    this.diag("Constructor property");
    
    this.ok(Joose.Proto.Meta.meta.constructor == Joose.Proto.Meta, "'constructor' property works as expected #0");
    this.ok(TestClass.meta.constructor == Joose.Proto.Meta, "'constructor' property works as expected #1");
    this.ok(testClass.constructor == TestClass, "'constructor' property works as expected #2");

    
    //==================================================================================================================================================================================
    this.diag("Meta property");
    
    this.ok(testClass.meta == TestClass.meta, "'meta' property is the same for class and its instances");
    this.ok(testClass.meta instanceof Joose.Proto.Meta, "Test's class 'meta' is a Joose.Proto.Meta");
    
    
    //==================================================================================================================================================================================
    this.diag("Methods");

    this.ok(Joose.Proto.Meta.meta.hasMethod('hasMethod'), "Joose.Proto.Meta has method 'hasMethod'");
    this.ok(Joose.Proto.Meta.meta.hasMethod('toString'), "Joose.Proto.Meta has method 'toString'");
    
    this.ok(TestClass.meta.hasMethod('inc'), "TestClass has method 'inc'");
    this.is(testClass.inc(1), 2, "... and it works");
    
    this.ok(TestClass.meta.hasMethod('toString'), "TestClass has method 'toString'");
    this.ok(TestClass.meta.hasMethod('SUPER'), "TestClass has method 'SUPER'");

    
    //==================================================================================================================================================================================
    this.diag("Inheritance and mutability (mutableness?)");
    
    var TestClass1 = new Joose.Proto.Meta('TestClass1', null, TestClass, {
        inc : function (a) { return this.SUPER(a) + 1 }
    }).c;
    var testClass1 = new TestClass1();
    
    this.is(testClass1.inc(1), 3, "'inc' was overriden and works correctly");
    
    testClass1.meta.removeMethod('inc');
    
    this.is(testClass1.inc(1), 2, "'inc' is now not overriden");
    
    
    //==================================================================================================================================================================================
    this.diag("isa (instanceof) operations");
    
    this.ok(testClass1 instanceof TestClass1, "testClass1 isa TestClass1");
    this.ok(testClass1 instanceof TestClass, "testClass1 isa TestClass");
    this.ok(testClass1 instanceof Joose.Proto.Object, "testClass1 isa Joose.Proto.Object");
    
    this.ok(Joose.Proto.Meta.meta instanceof Joose.Proto.Object, "Joose.Proto.Meta.meta isa Joose.Proto.Object");
    
    //==================================================================================================================================================================================
    this.diag("Stringification #2");
    
    this.is("" + testClass1, 'a TestClass1', "testClass1 stringified correctly");
    this.is("" + testClass1.meta,'a Joose.Proto.Meta', "testClass1's meta stringified correctly");
    
};

return testobj;
})()