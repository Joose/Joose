(function () {
var testobj = new Test.TAP.Class();
testobj.plan(23)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Kernel.ProtoMeta");
    
    this.ok(Joose.Kernel.ProtoMeta, "Joose.Kernel.ProtoMeta is here");
    

    //==================================================================================================================================================================================
    this.diag("Circularity");
    
    this.ok(Joose.Kernel.ProtoMeta.meta == Joose.Kernel.ProtoMeta.meta.meta, "Joose.Kernel.ProtoMeta's meta is perfectly circular");
    
    
    //==================================================================================================================================================================================
    this.diag("Stringification");
    
    this.is(Joose.Kernel.ProtoMeta,'Joose.Kernel.ProtoMeta', "Joose.Kernel.ProtoMeta stringified correctly");
    this.is("" + Joose.Kernel.ProtoMeta.meta,'a Joose.Kernel.ProtoMeta', "Joose.Kernel.ProtoMeta's meta stringified correctly");
    
    
    //==================================================================================================================================================================================
    this.diag("Inheritance from Joose.Kernel.ProtoClass");
    
    var TestClass = new Joose.Kernel.ProtoMeta('TestClass', null, null, {
        inc : function (a) { return a + 1 }
    }).c;
    var testClass = new TestClass();
    
    this.ok(true, "Initialized was inherited from Joose.Kernel.ProtoClass");
    
    
    //==================================================================================================================================================================================
    this.diag("Constructor property");
    
    this.ok(Joose.Kernel.ProtoMeta.meta.constructor == Joose.Kernel.ProtoMeta, "'constructor' property works as expected #0");
    this.ok(TestClass.meta.constructor == Joose.Kernel.ProtoMeta, "'constructor' property works as expected #1");
    this.ok(testClass.constructor == TestClass, "'constructor' property works as expected #2");

    
    //==================================================================================================================================================================================
    this.diag("Meta property");
    
    this.ok(testClass.meta == TestClass.meta, "'meta' property is the same for class and its instances");
    this.ok(testClass.meta instanceof Joose.Kernel.ProtoMeta, "Test's class 'meta' is a Joose.Kernel.ProtoMeta");
    
    
    //==================================================================================================================================================================================
    this.diag("Methods");

    this.ok(Joose.Kernel.ProtoMeta.meta.hasMethod('hasMethod'), "Joose.Kernel.ProtoMeta has method 'hasMethod'");
    this.ok(Joose.Kernel.ProtoMeta.meta.hasMethod('toString'), "Joose.Kernel.ProtoMeta has method 'toString'");
    
    this.ok(TestClass.meta.hasMethod('inc'), "TestClass has method 'inc'");
    this.is(testClass.inc(1), 2, "... and it works");
    
    this.ok(TestClass.meta.hasMethod('toString'), "TestClass has method 'toString'");
    this.ok(TestClass.meta.hasMethod('SUPER'), "TestClass has method 'SUPER'");

    
    //==================================================================================================================================================================================
    this.diag("Inheritance and mutability (mutableness?)");
    
    var TestClass1 = new Joose.Kernel.ProtoMeta('TestClass1', null, TestClass, {
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
    this.ok(testClass1 instanceof Joose.Kernel.ProtoClass, "testClass1 isa Joose.Kernel.ProtoClass");
    
    this.ok(Joose.Kernel.ProtoMeta.meta instanceof Joose.Kernel.ProtoClass, "Joose.Kernel.ProtoMeta.meta isa Joose.Kernel.ProtoClass");
    
    //==================================================================================================================================================================================
    this.diag("Stringification #2");
    
    this.is("" + testClass1, 'a TestClass1', "testClass1 stringified correctly");
    this.is("" + testClass1.meta,'a Joose.Kernel.ProtoMeta', "testClass1's meta stringified correctly");
    
};

return testobj;
})()