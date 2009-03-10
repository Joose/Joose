(function () {
var testobj = new Test.TAP.Class();
testobj.plan(25)

testobj.testSanity = function() {
    //==================================================================================================================================================================================
    this.diag("Joose.Proto.Class");
    
    this.ok(Joose.Proto.Class, "Joose.Proto.Class is here");
    

    //==================================================================================================================================================================================
    this.diag("Circularity");
    
    this.ok(Joose.Proto.Class.meta == Joose.Proto.Class.meta.meta, "Joose.Proto.Class's meta is perfectly circular");
    
    
    //==================================================================================================================================================================================
    this.diag("Stringification");
    
    this.is(Joose.Proto.Class,'Joose.Proto.Class', "Joose.Proto.Class stringified correctly");
    this.is("" + Joose.Proto.Class.meta,'a Joose.Proto.Class', "Joose.Proto.Class's meta stringified correctly");
    
    
    //==================================================================================================================================================================================
    this.diag("Inheritance from Joose.Proto.Object");
    
    var TestClass = new Joose.Proto.Class('TestClass', {
        inc : function (a) { return a + 1 }
    }).c;
    var testClass = new TestClass();
    
    this.ok(true, "Initialized was inherited from Joose.Proto.Object");
    
    
    //==================================================================================================================================================================================
    this.diag("Constructor property");
    
    this.ok(Joose.Proto.Class.meta.constructor == Joose.Proto.Class, "'constructor' property works as expected #0");
    this.ok(TestClass.meta.constructor == Joose.Proto.Class, "'constructor' property works as expected #1");
    this.ok(testClass.constructor == TestClass, "'constructor' property works as expected #2");

    
    //==================================================================================================================================================================================
    this.diag("Meta property");
    
    this.ok(testClass.meta == TestClass.meta, "'meta' property is the same for class and its instances");
    this.ok(testClass.meta instanceof Joose.Proto.Class, "Test's class 'meta' is a Joose.Proto.Class");
    
    
    //==================================================================================================================================================================================
    this.diag("Methods");

    this.ok(Joose.Proto.Class.meta.hasMethod('hasMethod'), "Joose.Proto.Class has method 'hasMethod'");
    this.ok(Joose.Proto.Class.meta.hasMethod('toString'), "Joose.Proto.Class has method 'toString'");
    
    this.ok(TestClass.meta.hasMethod('inc'), "TestClass has method 'inc'");
    this.is(testClass.inc(1), 2, "... and it works");
    
    this.ok(TestClass.meta.hasMethod('toString'), "TestClass has method 'toString'");
    this.ok(TestClass.meta.hasMethod('SUPER'), "TestClass has method 'SUPER'");
    
    this.ok(TestClass.meta.meta.hasAttribute('superClass'), "TestClass has method 'SUPER'");

    
    //==================================================================================================================================================================================
    this.diag("Inheritance and mutability (mutableness?)");
    
    var TestClass1 = new Joose.Proto.Class('TestClass1', {
        isa : TestClass,
        
        inc : function (a) { return this.SUPER(a) + 1 }
    }).c;
    var testClass1 = new TestClass1();
    
    this.is(testClass1.inc(1), 3, "'inc' was overriden and works correctly");
    
    testClass1.meta.removeMethod('inc');
    
    this.is(testClass1.inc(1), 2, "'inc' is now not overriden");
    
    testClass1.meta.addMethod('inc', function(){
        return this.SUPERARG(arguments) + 1
    });
    
    this.is(testClass1.inc(1), 3, "'inc' was overriden again and works correctly with SUPERARG call");
    
    
    //==================================================================================================================================================================================
    this.diag("isa (instanceof) operations");
    
    this.ok(testClass1 instanceof TestClass1, "testClass1 isa TestClass1");
    this.ok(testClass1 instanceof TestClass, "testClass1 isa TestClass");
    this.ok(testClass1 instanceof Joose.Proto.Object, "testClass1 isa Joose.Proto.Object");
    
    this.ok(Joose.Proto.Class.meta instanceof Joose.Proto.Object, "Joose.Proto.Class.meta isa Joose.Proto.Object");
    
    //==================================================================================================================================================================================
    this.diag("Stringification #2");
    
    this.is("" + testClass1, 'a TestClass1', "testClass1 stringified correctly");
    this.is("" + testClass1.meta,'a Joose.Proto.Class', "testClass1's meta stringified correctly");
    
};

return testobj;
})()