(function () {
var testobj = new Test.TAP.Class();
testobj.plan("no_plan")

testobj.testTypeConstraint = function() {
    var self = this;
    Type("Integer", {
        where: /^-?\d+$/
    })
    
    self.ok(TYPE, "We have a TYPE Module");
    self.ok(TYPE.Integer, "The new type is there");
    self.ok(TYPE.Integer.validate(123), "It matches valid input")
    self.throws_ok(function () {TYPE.Integer.validate("hallo")}, /The passed value /, 
        "It fails on invalid input")
    
    Module("MyTypes", function () {
        Type("PositiveInteger", {
            isa: TYPE.Integer,
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
            isa: TYPE.Integer,
            where: function (value) {
                return value > 0
            },
            coerce: [{
                from: TYPE.Integer,
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
                from: TYPE.Integer,
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
                isa: TYPE.BooleanTest,
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
    	self.ok(type == TYPE.BooleanTest, "Error handler invoked with correct type")
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
                from: TYPE.Any,
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
                from: TYPE.Any,
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
                isa: TYPE.Date
            },
            anniversary: {
                is: "rw",
                isa: TYPE.Date,
                coerce: true,
                nullable: true
            },
            exploding: {
                is: "rw",
                isa: TYPE.ExplodingTest,
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

    self.diag("Core Types");

    //TODO(jwall); self needs to live in a different namespace: Joose.Type
    //             and they should be exported?
    var undefined;
    
    self.ok(typeof TYPE.Any != 'undefined', 'we have a Any TypeConstraint');
    self.ok(TYPE.Any.validateBool(1), 'any validates a defined value');

    self.ok(typeof TYPE.Obj != 'undefined', 'we have a Obj TypeConstraint');
    self.ok(TYPE.Obj.validateBool({}), 'obj validates a object literal');
    self.diag(TYPE.Obj.validateBool(1)+'');
    self.ok(!TYPE.Obj.validateBool(1), 'obj does not validate a number literal');
    self.ok(TYPE.Obj._uses === TYPE.NotNull, 'Obj TypeConstraint uses TYPE.NotNull');
    
    self.ok(typeof TYPE.Null != 'undefined', 'we have a Null TypeConstraint');
    self.ok(TYPE.Null.validateBool(null), 'Null validates a null');
    self.ok(!TYPE.Null.validateBool(undefined), 'Null does not validate an undefined value');
    self.ok(!TYPE.Null.validateBool({}), 'Null does not validate an object');
    self.ok(TYPE.Null._uses === TYPE.Any, 'Null TypeConstraint uses TYPE.Any');
    
    self.ok(typeof TYPE.Str != 'undefined', 'we have a Str TypeConstraint');
    self.ok(TYPE.Str.validateBool(""), 'Str validates a String');
    self.ok(TYPE.Str.validateBool(new String()), 'Str validates a String Object');
    self.ok(!TYPE.Str.validateBool(1), 'Str does not validate a number literal');
    self.ok(TYPE.Str._uses === TYPE.NotNull, 'Str TypeConstraint uses TYPE.NotNull');
 
    self.ok(typeof TYPE.Enum != 'undefined', 'we have an Enum TypeConstraint');
    self.ok(TYPE.Enum._uses === TYPE.NotNull, 'Enum TypeConstraint uses TYPE.Any');

    Type("Color", {
        uses: TYPE.Enum,
        values: [ "red", "green", "blue" ]
    });

    Type("Rating", {
        uses: TYPE.Enum,
        values: [1,2,3,4,5],
        strictMatch: true
    });

    Type("BadEnum", {
        uses: TYPE.Enum
    });

    Class("EnumTest", {
        has: {
            color: {
                is: "rw",
                isa: TYPE.Color
            },
            rating: {
                is: "rw",
                isa: TYPE.Rating
            },
            bad: {
                is: "rw",
                isa: TYPE.BadEnum
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

    self.ok(TYPE.Color.getProps().values.push("purple"), "Added value to enum");

    self.ok(enumTest.setColor("purple"), "Setting enum to new allowed value succeeds");

    self.throws_ok(function () { new EnumTest({rating: "5"}) }, 
        /The passed value \[5\] is not \*strictly\* one of \[1,2,3,4,5\]/, 
        'newing up an EnumTest with invalid (by strict) enum value fails');

    self.ok(enumTest.setRating(5), "Setting enum to allowed strict value succeeds");

    
    self.ok(typeof TYPE.Num != 'undefined', 'we have a Num TypeConstraint');
    self.ok(TYPE.Num.validateBool(1), 'Num validates a number literal');
    self.ok(TYPE.Num.validateBool( new Number() ), 'Num validates a Number Object');
    self.ok(!TYPE.Num.validateBool(""), 'Num does not validate a String');
    self.ok(TYPE.Num._uses === TYPE.NotNull, 'Num TypeConstraint uses TYPE.NotNull');
    self.is(TYPE.Num.coerce("123"), 123, 'Num coerces "123" to 123');
    self.is(TYPE.Num.coerce(""), undefined, 'Num coerces "" to undefined');
    self.is(TYPE.Num.coerce(undefined), undefined, 'Num coerces undefined to undefined');
    self.is(TYPE.Num.coerce(null), undefined, 'Num coerces null to undefined');
    
    self.ok(typeof TYPE.Bool != 'undefined', 'we have a Bool TypeConstraint');
    self.ok(TYPE.Bool.validateBool(true), 'Bool validates true');
    self.ok(TYPE.Bool.validateBool(false), 'Bool validates false');
    self.ok(!TYPE.Bool.validateBool(1), 'Bool does not validate an number literal');
    self.ok(TYPE.Bool._uses === TYPE.NotNull, 'Bool TypeConstraint uses TYPE.NotNull');
    Joose.A.each([1,"1","true"], function(v) {
        self.is(TYPE.Bool.coerce(v), true, 'Bool coerces '+(typeof v)+' "'+v+'" to true');
    });
    self.is(TYPE.Bool.coerce(12345), null, 'Bool coerces 12345 to null');
    self.is(TYPE.Bool.coerce(null), undefined, 'Bool coerces null to undefined');
    self.is(TYPE.Bool.coerce(undefined), undefined, 'Bool coerces undefined to undefined');
    self.is(TYPE.Bool.coerce(""), undefined, 'Bool coerces "" to undefined');
    Joose.A.each(["0", 0, "false"], function(v) {
        self.is(TYPE.Bool.coerce(v), false, 'Bool coerces '+(typeof v)+' "'+v+'" to false');
    });
    
    // uses TYPE.Num
    self.ok(typeof TYPE.Int != 'undefined', 'we have a Int TypeConstraint');
    self.ok(TYPE.Int.validateBool(1), 'Int validates 1');
    self.ok(!TYPE.Int.validateBool(1.1), 'Int does not validate 1.1');
    self.ok(!TYPE.Int.validateBool(.1), 'Int does not validate .1');
    self.ok(TYPE.Int._uses === TYPE.Num, 'Int TypeConstraint uses TYPE.Num');
    self.is(TYPE.Int.coerce("123"), 123, 'Int coerces "123" to 123');
    self.is(TYPE.Int.coerce(""), undefined, 'Int coerces "" to undefined');
    self.is(TYPE.Int.coerce(undefined), undefined, 'Int coerces undefined to undefined');
    
    self.ok(typeof TYPE.Float != 'undefined', 'we have a Float TypeConstraint');
    self.ok(TYPE.Float.validateBool(1), 'Float does validate 1');
    self.ok(TYPE.Float.validateBool(1.1), 'Float does validate 1.1');
    self.ok(TYPE.Float.validateBool(.1), 'Float does validate .1');
    //self.ok(TYPE.Float._uses === TYPE.Num, 'Float TypeConstraint uses TYPE.Num');
    
    // uses TYPE.Obj
    self.ok(typeof TYPE.Func != 'undefined', 'we have a Func TypeConstraint');
    self.ok(TYPE.Func.validateBool( function() {} ), 'Func does validate a function');
    self.ok(!TYPE.Func.validateBool( {} ), 'Func does not validate an object');
    self.ok(TYPE.Func._uses === TYPE.Obj, 'Func TypeConstraint uses TYPE.Obj');
    
    self.ok(typeof TYPE.Array != 'undefined', 'we have a Array TypeConstraint');
    self.ok(TYPE.Array.validateBool( [] ), 'Array does validate a []');
    self.ok(TYPE.Array.validateBool( new Array() ), 'Array does validate a new Array()');
    self.ok(!TYPE.Array.validateBool( {} ), 'Array does not validate an object');
    self.ok(TYPE.Array._uses === TYPE.Obj, 'Array TypeConstraint uses TYPE.Obj');
    
    self.ok(typeof TYPE.Date != 'undefined', 'we have a Date TypeConstraint');
    self.ok(TYPE.Date.validateBool( new Date() ), 'Date does validate a Date Object');
    self.ok(!TYPE.Date.validateBool( {} ), 'Date does not validate a regular object');
    self.ok(TYPE.Date._uses === TYPE.Obj, 'Date TypeConstraint uses TYPE.Obj');
    self.is(TYPE.Date.coerce(""), undefined, 'Date coerces "" to undefined');
    self.ok(TYPE.Date.coerce("2008-12-31") instanceof Date, 'Date coerces "2008-12-31" to Date object');
    
    self.ok(typeof TYPE.Joose != 'undefined', 'we have a Joose TypeConstraint');
    self.ok(TYPE.Joose.validateBool( new BooleanTypeConstrained() ), 
        'Joose does validate a Joose Object');
    self.ok(!TYPE.Joose.validateBool( { } ), 
        'Joose does not validate a regular Object');
    self.ok(TYPE.Joose._uses === TYPE.Obj, 'Joose TypeConstraint uses TYPE.Obj');
    
};
return testobj
})()

