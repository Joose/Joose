(function () {
var testobj = new Test.TAP.Class();
testobj.plan(123)

testobj.testTypeConstraint = function() {
    var self = this;
    Type("Integer", {
        where: /^-?\d+$/
    })
    
    self.ok(Joose.Type, "We have a Joose.Type Module");
    self.ok(Joose.Type === Joose.Type, "TYPE is an alias to Joose.Type Module");
    self.ok(Joose.Type.Integer, "The new type is there");
    self.ok(Joose.Type.Integer.validate(123), "It matches valid input")
    self.throws_ok(function () {Joose.Type.Integer.validate("hallo")}, /The passed value /, 
        "It fails on invalid input")
    
    Module("MyTypes", function () {
        Type("PositiveInteger", {
            uses: Joose.Type.Integer,
            where: function (value) {
                return value > 0
            }
        })
    })
    
    self.ok(MyTypes.PositiveInteger, "Type in custom module is here")
    self.ok(MyTypes.PositiveInteger.validate(10), "It validates valid input")
    
    self.throws_ok(function () {MyTypes.PositiveInteger.validate(-10)}, 
        /The passed value /, 
        "It fails on invalid input (subtype)")
    self.throws_ok(function () {MyTypes.PositiveInteger.validate("hallo")}, 
        /The passed value /, 
        "It fails on invalid input (supertype)")
    
    self.ok(MyTypes.PositiveInteger.validate("1325135"), "It validates valid input")
    self.throws_ok(function () {MyTypes.PositiveInteger.validate("-123.12")}, 
        /The passed value /, "It fails on invalid input ")
    
    self.diag("Type Coercion")
    
    Module("MyTypes", function () {
        Type("PositiveIntegerWithCoercion", {
            isa: Joose.Type.Integer,
            where: function (value) {
                return value > 0
            },
            coerce: [{
                from: Joose.Type.Integer,
                via:  function (value) {
                    return Math.abs(value)
                }
            }]
        })
    })
    
    self.ok(MyTypes.PositiveIntegerWithCoercion, "Type with Coercion is here");
    self.can_ok(MyTypes.PositiveIntegerWithCoercion, "coerce")
    var value = MyTypes.PositiveIntegerWithCoercion.coerce(-10);
    
    self.is(value, 10, "Coercion works")
    var value = MyTypes.PositiveIntegerWithCoercion.coerce("one")
    self.ok(value == null, "Does not coerce wrong values")
    var value = MyTypes.PositiveIntegerWithCoercion.coerce(100)
    self.is(value, 100, "Leaves correct values alone")
    
    // now just test plain vanilla type constraints in class attributes
    self.diag('type constrained vanilla class attributes');
    
    Type('BooleanTest', {
        where: function(value) {
            if (typeof value == 'boolean') {
                return true;
            }
            return false;
        },
        coerce: [{
                from: Joose.Type.Integer,
                 via:  function (value) {
                    if ( value == 0 )
                        return false;
                    return true;
                }
            }]
        }
    );
    
    Class("BooleanTypeConstrained", {
        has: {
            attr1: {
                is: 'rw',
                isa: Joose.Type.BooleanTest,
                coerce: true
            }
        }
    })
    
    
    var constrained = new BooleanTypeConstrained({attr1: false});
    self.ok(constrained.getAttr1() == false, "setting boolean constrained to false in constructor succeeds")
    
    self.ok(constrained.setAttr1(true), 'setting boolean constrained to true succeeds');
    self.throws_ok(function () { constrained.setAttr1('foo')}, 
        /The passed value \[foo\] is not a BooleanTest/, 
        'setting boolean constrained to foo fails');
    constrained.setAttr1('foo', function (e, type) {
    	self.ok(type == Joose.Type.BooleanTest, "Error handler invoked with correct type")
    })
    
    self.throws_ok(function () { new BooleanTypeConstrained({attr1: 'foo'})}, 
        /The passed value \[foo\] is not a BooleanTest/, 
        'setting boolean constrained to foo in constructor fails');
    
    self.throws_ok(function () { new BooleanTypeConstrained({attr1: "one"}) }, 
        /The passed value \[one\] is not a BooleanTest/, 
        'newing up a boolean constrained with non boolean value fails');
        
    self.ok(constrained.setAttr1(1), 'setting boolean to 1 succeeds');
    self.ok(constrained.getAttr1() !== 1, '...but value was not actually set to 1');
    self.ok(constrained.getAttr1() === true, '1 coerces to boolean true');
    
    self.ok(constrained.setAttr1(0), 'setting boolean to 0 succeeds');
    self.ok(constrained.getAttr1() !== 0, '...but value was not actually set to 0');
    self.ok(constrained.getAttr1() === false, '0 coerces to boolean false');
    
    self.ok(new BooleanTypeConstrained({attr1: 1}).getAttr1() == true, "setting boolean to 1 coerces to true in constructor")

    self.diag("'nullable' support");

    Type('ExplodingTest', {
        where: function(value) {
            throw "where type check function called!"
        },
        coerce: [{
                from: Joose.Type.Any,
                 via:  function (value) {
                    throw "Coercion called!";
                }
            }]
        }
    );

    Type('ValidationExplodingTest', {
        where: function(value) {
            throw "where type check function called!"
        },
        coerce: [{
                from: Joose.Type.Any,
                 via:  function (value) {
                    // Coerce everything to undefined
                    return undefined;
                }
            }]
        }
    );

    Class("NullableAttrTest", {
        has: {
            birthDate: {
                is: "rw",
                coerce: true,
                isa: Joose.Type.Date
            },
            anniversary: {
                is: "rw",
                isa: Joose.Type.Date,
                coerce: true,
                nullable: true
            },
            exploding: {
                is: "rw",
                isa: Joose.Type.ExplodingTest,
                coerce: true,
                nullable: true
            }
        }
    });
    var nullableTest = new NullableAttrTest();

    self.ok(nullableTest.setExploding(null),
            'null value passed to nullable field bypasses validation and coercion');

    self.ok(nullableTest.setExploding(undefined),
            'undefined value passed to nullable field bypasses validation and coercion');

    self.throws_ok(function () { nullableTest.setBirthDate(undefined) }, 
        /The passed value \[undefined\] is not a Date/, 
        'setting undefined value for non-nullable property fails');

    self.throws_ok(function () { nullableTest.setBirthDate(null) }, 
        /The passed value \[null\] is not a Date/, 
        'setting null value for non-nullable property fails');

    self.throws_ok(function () { nullableTest.setBirthDate("") }, 
        /The passed value \[\] is not a Date/, 
        'empty string coerced into undefined value (translated to null) for non-nullable Date fails');

    self.ok(nullableTest.setAnniversary(""),
            'empty string coerced into undefined for nullable property succeeds');

    self.ok(nullableTest.setAnniversary(undefined),
            'setting undefined value for nullable property succeeds');

    self.ok(nullableTest.setAnniversary(null),
            'setting null value for nullable property succeeds');
    
    self.diag("Anonymous type")
    
    Class("TestAnonTypes", {
        has: {
            anon: {
                isa: Type({ where: /^abc$/ }),
                is: "rw"
            },
            justRegExp: {
                isa: Type(/\d+/),
                is: "rw"
            },
            justFunction: {
                isa: Type(function (value) { return value > 0 }),
                is: "rw"
            }
        }
    })
    
    self.lives_ok(function () {
        var o = new TestAnonTypes();
        o.setAnon("abc")
    }, "Anon type accepts correct values")
    
    self.lives_ok(function () {
        var o = new TestAnonTypes();
        o.setJustRegExp("123")
    }, "Just RegExp anon type accepts correct values")
    
    self.lives_ok(function () {
        var o = new TestAnonTypes();
        o.setJustFunction(123)
    }, "Just Function anon type accepts correct values")
    
    self.throws_ok(function () {
        var o = new TestAnonTypes();
        o.setAnon("")
    }, /The passed value/, "Anon type denies values")
    
    self.throws_ok(function () {
        var o = new TestAnonTypes();
        o.setJustRegExp("abc")
    }, /The passed value/, "Just RegExp anon type denies wrong values")
    
    self.throws_ok(function () {
        var o = new TestAnonTypes();
        o.setJustFunction(-1)
    }, /The passed value/, "Just Function anon type denies wrong values")
    
    self.diag("Core Types");

    var undefined;
    
    self.ok(typeof Joose.Type.Any != 'undefined', 'we have a Any TypeConstraint');
    self.ok(Joose.Type.Any.validateBool(1), 'any validates a defined value');

    self.ok(typeof Joose.Type.Obj != 'undefined', 'we have a Obj TypeConstraint');
    self.ok(Joose.Type.Obj.validateBool({}), 'obj validates a object literal');
    self.diag(Joose.Type.Obj.validateBool(1)+'');
    self.ok(!Joose.Type.Obj.validateBool(1), 'obj does not validate a number literal');
    self.ok(Joose.Type.Obj._uses === Joose.Type.NotNull, 'Obj TypeConstraint uses Joose.Type.NotNull');
    
    self.ok(typeof Joose.Type.Null != 'undefined', 'we have a Null TypeConstraint');
    self.ok(Joose.Type.Null.validateBool(null), 'Null validates a null');
    self.ok(!Joose.Type.Null.validateBool(undefined), 'Null does not validate an undefined value');
    self.ok(!Joose.Type.Null.validateBool({}), 'Null does not validate an object');
    self.ok(Joose.Type.Null._uses === Joose.Type.Any, 'Null TypeConstraint uses Joose.Type.Any');
    
    self.ok(typeof Joose.Type.Str != 'undefined', 'we have a Str TypeConstraint');
    self.ok(Joose.Type.Str.validateBool(""), 'Str validates a String');
    self.ok(Joose.Type.Str.validateBool(new String()), 'Str validates a String Object');
    self.ok(!Joose.Type.Str.validateBool(1), 'Str does not validate a number literal');
    self.ok(Joose.Type.Str._uses === Joose.Type.NotNull, 'Str TypeConstraint uses Joose.Type.NotNull');
 
    self.ok(typeof Joose.Type.Enum != 'undefined', 'we have an Enum TypeConstraint');
    self.ok(Joose.Type.Enum._uses === Joose.Type.NotNull, 'Enum TypeConstraint uses Joose.Type.Any');

    Type("Color", {
        uses: Joose.Type.Enum,
        values: [ "red", "green", "blue" ]
    });

    Type("Rating", {
        uses: Joose.Type.Enum,
        values: [1,2,3,4,5],
        strictMatch: true
    });

    Type("BadEnum", {
        uses: Joose.Type.Enum
    });

    Class("EnumTest", {
        has: {
            color: {
                is: "rw",
                isa: Joose.Type.Color
            },
            rating: {
                is: "rw",
                isa: Joose.Type.Rating
            },
            bad: {
                is: "rw",
                isa: Joose.Type.BadEnum
            }
        }
    });
    var enumTest = new EnumTest();

    self.throws_ok(function () { new EnumTest({bad: "potato"}) }, 
        /Enum Type needs Array of values in 'values' property of Type declaration/, 
        'newing up an EnumTest with invalid missing valid property fails');

    self.throws_ok(function () { new EnumTest({color: "purple"}) }, 
        /The passed value \[purple\] is not one of \[red,green,blue\]/, 
        'newing up an EnumTest with invalid enum value fails');

    self.ok(enumTest.setColor("green"), "Setting enum to allowed value succeeds");

    self.ok(Joose.Type.Color.getProps().values.push("purple"), "Added value to enum");

    self.ok(enumTest.setColor("purple"), "Setting enum to new allowed value succeeds");

    self.throws_ok(function () { new EnumTest({rating: "5"}) }, 
        /The passed value \[5\] is not \*strictly\* one of \[1,2,3,4,5\]/, 
        'newing up an EnumTest with invalid (by strict) enum value fails');

    self.ok(enumTest.setRating(5), "Setting enum to allowed strict value succeeds");

    
    self.ok(typeof Joose.Type.Num != 'undefined', 'we have a Num TypeConstraint');
    self.ok(Joose.Type.Num.validateBool(1), 'Num validates a number literal');
    self.ok(Joose.Type.Num.validateBool( new Number() ), 'Num validates a Number Object');
    self.ok(!Joose.Type.Num.validateBool(""), 'Num does not validate a String');
    self.ok(Joose.Type.Num._uses === Joose.Type.NotNull, 'Num TypeConstraint uses Joose.Type.NotNull');
    self.is(Joose.Type.Num.coerce("123"), 123, 'Num coerces "123" to 123');
    self.is(Joose.Type.Num.coerce(""), undefined, 'Num coerces "" to undefined');
    self.is(Joose.Type.Num.coerce(undefined), undefined, 'Num coerces undefined to undefined');
    self.is(Joose.Type.Num.coerce(null), undefined, 'Num coerces null to undefined');
    
    self.ok(typeof Joose.Type.Bool != 'undefined', 'we have a Bool TypeConstraint');
    self.ok(Joose.Type.Bool.validateBool(true), 'Bool validates true');
    self.ok(Joose.Type.Bool.validateBool(false), 'Bool validates false');
    self.ok(!Joose.Type.Bool.validateBool(1), 'Bool does not validate an number literal');
    self.ok(Joose.Type.Bool._uses === Joose.Type.NotNull, 'Bool TypeConstraint uses Joose.Type.NotNull');
    Joose.A.each([1,"1","true"], function(v) {
        self.is(Joose.Type.Bool.coerce(v), true, 'Bool coerces '+(typeof v)+' "'+v+'" to true');
    });
    self.is(Joose.Type.Bool.coerce(12345), null, 'Bool coerces 12345 to null');
    self.is(Joose.Type.Bool.coerce(null), false, 'Bool coerces null to false');
    self.is(Joose.Type.Bool.coerce(undefined), false, 'Bool coerces undefined to false');
    self.is(Joose.Type.Bool.coerce(""), false, 'Bool coerces "" to false');
    Joose.A.each(["0", 0, "false"], function(v) {
        self.is(Joose.Type.Bool.coerce(v), false, 'Bool coerces '+(typeof v)+' "'+v+'" to false');
    });
    
    // uses Joose.Type.Num
    self.ok(typeof Joose.Type.Int != 'undefined', 'we have a Int TypeConstraint');
    self.ok(Joose.Type.Int.validateBool(1), 'Int validates 1');
    self.ok(!Joose.Type.Int.validateBool(1.1), 'Int does not validate 1.1');
    self.ok(!Joose.Type.Int.validateBool(.1), 'Int does not validate .1');
    self.ok(Joose.Type.Int._uses === Joose.Type.Num, 'Int TypeConstraint uses Joose.Type.Num');
    self.is(Joose.Type.Int.coerce("123"), 123, 'Int coerces "123" to 123');
    self.is(Joose.Type.Int.coerce(""), undefined, 'Int coerces "" to undefined');
    self.is(Joose.Type.Int.coerce(undefined), undefined, 'Int coerces undefined to undefined');
    
    self.ok(typeof Joose.Type.Float != 'undefined', 'we have a Float TypeConstraint');
    self.ok(Joose.Type.Float.validateBool(1), 'Float does validate 1');
    self.ok(Joose.Type.Float.validateBool(1.1), 'Float does validate 1.1');
    self.ok(Joose.Type.Float.validateBool(.1), 'Float does validate .1');
    //self.ok(Joose.Type.Float._uses === Joose.Type.Num, 'Float TypeConstraint uses Joose.Type.Num');
    
    // uses Joose.Type.Obj
    self.ok(typeof Joose.Type.Func != 'undefined', 'we have a Func TypeConstraint');
    self.ok(Joose.Type.Func.validateBool( function() {} ), 'Func does validate a function');
    self.ok(!Joose.Type.Func.validateBool( {} ), 'Func does not validate an object');
    self.ok(Joose.Type.Func._uses === Joose.Type.Obj, 'Func TypeConstraint uses Joose.Type.Obj');
    
    self.ok(typeof Joose.Type.Array != 'undefined', 'we have a Array TypeConstraint');
    self.ok(Joose.Type.Array.validateBool( [] ), 'Array does validate a []');
    self.ok(Joose.Type.Array.validateBool( new Array() ), 'Array does validate a new Array()');
    self.ok(!Joose.Type.Array.validateBool( {} ), 'Array does not validate an object');
    self.ok(Joose.Type.Array._uses === Joose.Type.Obj, 'Array TypeConstraint uses Joose.Type.Obj');
    
    self.ok(typeof Joose.Type.Date != 'undefined', 'we have a Date TypeConstraint');
    self.ok(Joose.Type.Date.validateBool( new Date() ), 'Date does validate a Date Object');
    self.ok(!Joose.Type.Date.validateBool( {} ), 'Date does not validate a regular object');
    self.ok(Joose.Type.Date._uses === Joose.Type.Obj, 'Date TypeConstraint uses Joose.Type.Obj');
    self.is(Joose.Type.Date.coerce(""), undefined, 'Date coerces "" to undefined');
    self.ok(Joose.Type.Date.coerce("2008-12-31") instanceof Date, 'Date coerces "2008-12-31" to Date object');
    
    self.ok(typeof Joose.Type.Joose != 'undefined', 'we have a Joose TypeConstraint');
    self.ok(Joose.Type.Joose.validateBool( new BooleanTypeConstrained() ), 
        'Joose does validate a Joose Object');
    self.ok(!Joose.Type.Joose.validateBool( { } ), 
        'Joose does not validate a regular Object');
    self.ok(Joose.Type.Joose._uses === Joose.Type.Obj, 'Joose TypeConstraint uses Joose.Type.Obj');
    
};
return testobj
})()

