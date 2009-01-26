(function () {
var testobj = new Test.TAP.Class();
testobj.plan(39)

testobj.testMethodSignatures = function() {
    var t = this;
    t.diag("Sanity")
    t.ok(Joose,   "Joose is here");
    t.ok(Joose.TypedMethod,   "We have the TypedMethod class");

    Class("TypedMethodTestClass", {
        methods: {
            test: function () { return "foo"  }
        }
    })
    
    var method = new Joose.TypedMethod("typed", function (a, b) { return a + b }, {})
    method.setTypes([Joose.Type.Int, Joose.Type.Str]);
    
    TypedMethodTestClass.meta.addMethodObject(method);
    
    var o = new TypedMethodTestClass();
    
    t.ok(o.meta.can("typed"), "Method is there");
    t.ok(typeof o.typed === "function", "There is actually a function in the spot");
    
    var result;
    t.lives_ok(function () {
        result = o.typed(1, "str");
    }, "setting correct types throws no exception")
    
    t.ok(result === "1str", "result from typed method is correct")
    
    // exceptions
    
    t.throws_ok(function () {
        o.typed("str", 1)
    }, /The passed value/, "Calling with incorrect types throws exception")
    
    // builder syntax
    t.diag("Testing builder syntax for typed methods")
    
    Class("SomeClass", {
    })
    
    Class("SomeSubClass", {
        isa: SomeClass,
        does: Joose.Storage
    })
    
    
    Class("TypedMethodLiteral", {
        methods: {
            typed: {
                signature: [Joose.Type.Int, Joose.Type.Str],
                method:    function typed (a, b) { return a + b }
            },
            
            add: {
                signature: [Joose.Type.Int, Joose.Type.Int],
                method:    function add (a, b) { return a + b },
                coerce:    true
            },
            
            withTypeClassAndRole: {
                signature: [Joose.Type.Str, SomeClass, Joose.Storage],
                method:    function (str, anObject, role) {  
                    return "test"
                }
            }
        }
    })
    
    var o = new TypedMethodLiteral();
    
    t.ok(o.meta.can("typed"), "Typed method is there");
    t.ok(typeof o.typed === "function", "There is actually a function in the spot");
    
    t.lives_ok(function () {
        result = o.typed(1, "str");
    }, "setting correct types throws no exception")
    
    t.ok(result === "1str", "result from typed method is correct")
    
    // exceptions
    
    t.throws_ok(function () {
        o.typed("str", 1)
    }, /The passed value/, "Calling with incorrect types throws exception")
    
    // coercion
    t.diag("Testing coercion")
    t.ok(o.meta.can("add"), "Method with coercion is there");
    t.ok(typeof o.add === "function", "There is actually a function in the spot");
    
    
    t.lives_ok(function () {
        result = o.add(1, "2");
    }, "setting coercable types throws no exception")
    
    t.ok(result === 3, "result from typed/coerced method is correct: "+result)

    t.throws_ok(function () {
        o.add("str", 1)
    }, /The passed value/, "Calling with incoercable types throws exception")
    
    // Types, Classes and Roles
    t.diag("Types, Classes and Roles")
    
    t.ok(o.meta.can("withTypeClassAndRole"), "Typed method is there");
    t.ok(typeof o.withTypeClassAndRole === "function", "There is actually a function in the spot");
    
    
    var obj = new SomeClass();
    var sub = new SomeSubClass(); // does Joose.Storage
    
    t.lives_ok(function () {
        o.withTypeClassAndRole("test", obj, sub);
    }, "setting correct types throws no exception (class, role)")
    
    t.lives_ok(function () {
        o.withTypeClassAndRole("test", sub, sub);
    }, "setting correct types throws no exception (subclass, role)")

    t.throws_ok(function () {
        o.withTypeClassAndRole(1, obj, sub)
    }, /The passed value/, "Calling with incorrect types throws exception (no str)")
    
    t.throws_ok(function () {
        o.withTypeClassAndRole("test", obj, obj)
    }, /The parameter 2 only accepts values that are objects of type Joose.Storage/, "Calling with incorrect types throws exception (role missing)")
    
    t.throws_ok(function () {
        o.withTypeClassAndRole("test", o, sub)
    }, /The parameter 1 only accepts values that are objects of type SomeClass/, "Calling with incorrect types throws exception (not correct class)")
    
    t.diag("inheritance")
    Class("SubTypedMethodLiteral", {
        isa: TypedMethodLiteral,
        methods: {
            add: {
                signature: [Joose.Type.Int, Joose.Type.Int],
                method:    function add (a, b) { return a + b + 2 },
                coerce:    true
            }
        }
    })
    
    var o = new SubTypedMethodLiteral();
    
    t.diag("Inherited method")
    t.ok(o.meta.can("typed"), "Typed method is there");
    t.ok(typeof o.typed === "function", "There is actually a function in the spot");
    
    t.lives_ok(function () {
        result = o.typed(1, "str");
    }, "setting correct types throws no exception")
    
    t.ok(result === "1str", "result from typed method is correct: " + result)
    
    // exceptions
    
    t.throws_ok(function () {
        o.typed("str", 1)
    }, /The passed value/, "Calling with incorrect types throws exception")
    
    // coercion
    t.diag("Testing overriding")
    t.ok(o.meta.can("add"), "Method with coercion is there");
    t.ok(typeof o.add === "function", "There is actually a function in the spot");
    
    
    t.lives_ok(function () {
        result = o.add(1, "2");
    }, "setting coercable types throws no exception")
    
    t.ok(result === 5, "result from typed/coerced method is correct: "+result)

    t.throws_ok(function () {
        o.add("str", 1)
    }, /The passed value/, "Calling with incoercable types throws exception")
    
    
    t.diag("Roles")
    Role("TypedMethods", {
        methods: {
            multiply: {
                signature: [Joose.Type.Num, Joose.Type.Num, Joose.Type.Num],
                method:    function multiply (a, b, c) {
                    return a * b * c;
                }
            }
        }
    })
    
    Class("DoTypedRole", {
        does: [TypedMethods]
    });
    
    var o = new DoTypedRole();
    
    t.ok(o.meta.can("multiply"), "Typed method is there");
    t.ok(typeof o.multiply === "function", "There is actually a function in the spot");
    
    
    t.lives_ok(function () {
        result = o.multiply(1.5, 2, 3);
    }, "setting correct types throws no exception")
    
    t.ok(result === 9, "result from typed method is correct")
    
    t.throws_ok(function () {
        o.multiply(1, 2, "foo")
    }, /The passed value/, "Calling with incorrect types throws exception")
    
    t.diag("Example")
    
    var form = { addMe: { value: 2 } }
    
    // Make a class thats adds to its instance variable "amount"
    Class("Adder", {
        has: {
            amount: { is: "rw" }
        },
        methods: {
            // add is a method with a signature
            add: {
                signature: [Joose.Type.Int], // the first parameter must be an integer
                method:    function add (num) {
                    return num + this.amount // add the argument num to our instance var amount
                },
                coerce:    true // enable coercions for arguments
            }
        }
    })
    
    // Make an adder that always adds 3
    var addTo3 = new Adder({ amount: 3 })
    
    // add 3 to the value of the input field
    //alert(addTo3.add(form.addMe.value));

};

return testobj;
})()