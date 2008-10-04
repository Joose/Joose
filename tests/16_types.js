plan(60);

Type("Integer", {
    where: /^-?\d+$/
})

ok(TYPE, "We have a TYPE Module");

ok(TYPE.Integer, "The new type is there");

ok(TYPE.Integer.validate(123), "It matches valid input")

fail(function () {TYPE.Integer.validate("hallo")}, "The passed value ", 
    "It fails on invalid input")

Module("MyTypes", function () {
    Type("PositiveInteger", {
        isa: TYPE.Integer,
        where: function (value) {
            return value > 0
        }
    })
})

ok(MyTypes.PositiveInteger, "Type in custom module is here")
ok(MyTypes.PositiveInteger.validate(10), "It validates valid input")

fail(function () {MyTypes.PositiveInteger.validate(-10)}, "The passed value ", 
    "It fails on invalid input (subtype)")
fail(function () {MyTypes.PositiveInteger.validate("hallo")}, "The passed value ", 
    "It fails on invalid input (supertype)")

ok(MyTypes.PositiveInteger.validate("1325135"), "It validates valid input")
fail(function () {MyTypes.PositiveInteger.validate("-123.12")}, 
    "The passed value ", "It fails on invalid input ")

diag("Type Coercion")

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

ok(MyTypes.PositiveIntegerWithCoercion, "Type with Coercion is here");
canOk(MyTypes.PositiveIntegerWithCoercion, "coerce")
var value = MyTypes.PositiveIntegerWithCoercion.coerce(-10);
isEq(value, 10, "Coercion works")
var value = MyTypes.PositiveIntegerWithCoercion.coerce("one")
ok(value == null, "Does not coerce wrong values")
var value = MyTypes.PositiveIntegerWithCoercion.coerce(100)
isEq(value, 100, "Leaves correct values alone")

// now just test plain vanilla type constraints in class attributes
diag('type constrained vanilla class attributes');

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
ok(constrained.getAttr1() == false, "setting boolean constrained to false in constructor succeeds")

ok(constrained.setAttr1(true), 'setting boolean constrained to true succeeds');
fail(function () { constrained.setAttr1('foo')}, 
    'The passed value [foo] is not a BooleanTest', 
    'setting boolean constrained to foo fails');
constrained.setAttr1('foo', function (e, type) {
	ok(type == TYPE.BooleanTest, "Error handler invoked with correct type")
})

fail(function () { new BooleanTypeConstrained({attr1: 'foo'})}, 
    'The passed value [foo] is not a BooleanTest', 
    'setting boolean constrained to foo in constructor fails');

fail(function () { new BooleanTypeConstrained({attr1: "one"}) }, 
    'The passed value [one] is not a BooleanTest', 
    'newing up a boolean constrained with non boolean value fails');
    
ok(constrained.setAttr1(1), 'setting boolean to 1 succeeds');
ok(constrained.getAttr1() !== 1, '...but value was not actually set to 1');
ok(constrained.getAttr1() === true, '1 coerces to boolean true');

ok(constrained.setAttr1(0), 'setting boolean to 0 succeeds');
ok(constrained.getAttr1() !== 0, '...but value was not actually set to 0');
ok(constrained.getAttr1() === false, '0 coerces to boolean false');

ok(new BooleanTypeConstrained({attr1: 1}).getAttr1() == true, "setting boolean to 1 coerces to true in constructor")

//TODO(jwall); this needs to live in a different namespace: Joose.Type
//             and they should be exported?
ok(typeof TYPE.Any != 'undefined', 'we have a Any TypeConstraint');

ok(typeof TYPE.Obj != 'undefined', 'we have a Obj TypeConstraint');
ok(TYPE.Obj._uses === TYPE.Any, 'Obj TypeConstraint uses TYPE.Any');
ok(typeof TYPE.Null != 'undefined', 'we have a Null TypeConstraint');
ok(TYPE.Null._uses === TYPE.Any, 'Null TypeConstraint uses TYPE.Any');
ok(typeof TYPE.Str != 'undefined', 'we have a Str TypeConstraint');
ok(TYPE.Str._uses === TYPE.Any, 'Str TypeConstraint uses TYPE.Any');
ok(typeof TYPE.Bool != 'undefined', 'we have a Bool TypeConstraint');
ok(TYPE.Bool._uses === TYPE.Any, 'Bool TypeConstraint uses TYPE.Any');
ok(typeof TYPE.Num != 'undefined', 'we have a Num TypeConstraint');
ok(TYPE.Num._uses === TYPE.Any, 'Num TypeConstraint uses TYPE.Any');
ok(typeof TYPE.Int != 'undefined', 'we have a Int TypeConstraint');
ok(TYPE.Int._uses === TYPE.Num, 'Int TypeConstraint uses TYPE.Num');
ok(typeof TYPE.Float != 'undefined', 'we have a Float TypeConstraint');
ok(TYPE.Float._uses === TYPE.Num, 'Float TypeConstraint uses TYPE.Num');

// uses TYPE.Obj
ok(typeof TYPE.Array != 'undefined', 'we have a Array TypeConstraint');
ok(TYPE.Array._uses === TYPE.Obj, 'Array TypeConstraint uses TYPE.Obj');
ok(typeof TYPE.Func != 'undefined', 'we have a Func TypeConstraint');
ok(TYPE.Func._uses === TYPE.Obj, 'Func TypeConstraint uses TYPE.Obj');
ok(typeof TYPE.Date != 'undefined', 'we have a Date TypeConstraint');
ok(TYPE.Date._uses === TYPE.Obj, 'Date TypeConstraint uses TYPE.Obj');

ok(typeof TYPE.Joose != 'undefined', 'we have a Joose TypeConstraint');
ok(TYPE.Joose._uses === TYPE.Obj, 'Joose TypeConstraint uses TYPE.Obj');

//TODO(jwall): handler property tests for callbacks;

//TODO(malte): Add this to new test file

Class("CoercionTest", {
    has: {
        num: {
            isa:    TYPE.Num,
            coerce: true,
            is:     "rw"
        },
        str: {
            isa:    TYPE.Str,
            coerce: true,
            is:     "rw"
        },
        date: {
            isa:    TYPE.Date,
            coerce: true,
            is:     "rw"
        }
    }
})

var coerce = new CoercionTest();


nofail(function () { coerce.setNum("2") }, "Setting to coercable type does not fail (Num)")
ok(coerce.getNum()     === 2, "Coercion from Str to Num works")
ok(coerce.getNum() + 2 === 4, "Coercion from Str to Num works (result can be added)")
var coerce = new CoercionTest();

nofail(function () { coerce.setNum("-2") }, "Setting to coercable type does not fail (Num)")
ok(coerce.getNum()     === -2, "Coercion from Str to Num works with negative numbers")
ok(coerce.getNum() + 2 ===  0, "Coercion from Str to Num works with negative numbers (result can be added)")

nofail(function () { coerce.setNum("0.5") }, "Setting to coercable type does not fail (Num)")
ok(coerce.getNum()     === 0.5, "Coercion from Str to Num works with floats")
ok(coerce.getNum() + 2 === 2.5, "Coercion from Str to Num works with floats (result can be added)")

nofail(function () { coerce.setStr(2) }, "Setting to coercable type does not fail (Num->Str)")
ok(coerce.getStr()     === "2", "Coercion from Any to Str works")
ok(coerce.getStr() + 2 === "22", "Coercion from Any to Str works (result can be added with string semantics)")

var array = ["a", "b"];
nofail(function () { coerce.setStr(array) }, "Setting to coercable type does not fail (Array->Str)")
ok(coerce.getStr()     === array.toString(), "Coercion from Any to Str works")

nofail(function () { coerce.setDate("1980-10-27") }, "Setting to coercable type does not fail (Str->Date)")
var date = coerce.getDate();
ok(date.constructor === Date, "String was coerced to date")
ok(date.getTime()   === new Date(1980, 9, 27).getTime(), "Coercion from Str to Date works")
fail(function () {coerce.setDate("noDate") }, "is not a Date", "Setting date to invalid string fails")


endTests();
