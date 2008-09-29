var r = new Test.TAP.Runner();
var tests = {name: 'Types'};
tests.runtests = function() {

    var t = new Test.TAP();
    
    t.plan(51);
    
    Type("Integer", {
        where: /^-?\d+$/
    })
    
    t.ok(TYPE, "We have a TYPE Module");
    
    t.ok(TYPE.Integer, "The new type is there");
    
    t.ok(TYPE.Integer.validate(123), "It matches valid input")
    
    t.throws_ok(function () {TYPE.Integer.validate("hallo")}, /The passed value /, 
        "It fails on invalid input")
    
    Module("MyTypes", function () {
        Type("PositiveInteger", {
            isa: TYPE.Integer,
            where: function (value) {
                return value > 0
            }
        })
    })
    
    t.ok(MyTypes.PositiveInteger, "Type in custom module is here")
    t.ok(MyTypes.PositiveInteger.validate(10), "It validates valid input")
    
    t.throws_ok(function () {MyTypes.PositiveInteger.validate(-10)}, 
        /The passed value /, 
        "It fails on invalid input (subtype)")
    t.throws_ok(function () {MyTypes.PositiveInteger.validate("hallo")}, 
        /The passed value /, 
        "It fails on invalid input (supertype)")
    
    t.ok(MyTypes.PositiveInteger.validate("1325135"), "It validates valid input")
    t.throws_ok(function () {MyTypes.PositiveInteger.validate("-123.12")}, 
        /The passed value /, "It fails on invalid input ")
    
    t.diag("Type Coercion")
    
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
    
    t.ok(MyTypes.PositiveIntegerWithCoercion, "Type with Coercion is here");
    t.can_ok(MyTypes.PositiveIntegerWithCoercion, "coerce")
    var value = MyTypes.PositiveIntegerWithCoercion.coerce(-10);
    t.is(value, 10, "Coercion works")
    var value = MyTypes.PositiveIntegerWithCoercion.coerce("one")
    t.ok(value == null, "Does not coerce wrong values")
    var value = MyTypes.PositiveIntegerWithCoercion.coerce(100)
    t.is(value, 100, "Leaves correct values alone")
    
    // now just test plain vanilla type constraints in class attributes
    t.diag('type constrained vanilla class attributes');
    
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
    t.ok(constrained.getAttr1() == false, "setting boolean constrained to false in constructor succeeds")
    
    t.ok(constrained.setAttr1(true), 'setting boolean constrained to true succeeds');
    t.throws_ok(function () { constrained.setAttr1('foo')}, 
        /The passed value \[foo\] is not a BooleanTest/, 
        'setting boolean constrained to foo fails');
    constrained.setAttr1('foo', function (e, type) {
    	t.ok(type == TYPE.BooleanTest, "Error handler invoked with correct type")
    })
    
    t.throws_ok(function () { new BooleanTypeConstrained({attr1: 'foo'})}, 
        /The passed value \[foo\] is not a BooleanTest/, 
        'setting boolean constrained to foo in constructor fails');
    
    t.throws_ok(function () { new BooleanTypeConstrained({attr1: "one"}) }, 
        /The passed value \[one\] is not a BooleanTest/, 
        'newing up a boolean constrained with non boolean value fails');
        
    t.ok(constrained.setAttr1(1), 'setting boolean to 1 succeeds');
    t.ok(constrained.getAttr1() !== 1, '...but value was not actually set to 1');
    t.ok(constrained.getAttr1() === true, '1 coerces to boolean true');
    
    t.ok(constrained.setAttr1(0), 'setting boolean to 0 succeeds');
    t.ok(constrained.getAttr1() !== 0, '...but value was not actually set to 0');
    t.ok(constrained.getAttr1() === false, '0 coerces to boolean false');
    
    t.ok(new BooleanTypeConstrained({attr1: 1}).getAttr1() == true, "setting boolean to 1 coerces to true in constructor")
    
    //TODO(jwall); this needs to live in a different namespace: Joose.Type
    //             and they should be exported?
    t.ok(typeof TYPE.Any != 'undefined', 'we have a Any TypeConstraint');
    
    t.ok(typeof TYPE.Obj != 'undefined', 'we have a Obj TypeConstraint');
    t.ok(TYPE.Obj._uses === TYPE.Any, 'Obj TypeConstraint uses TYPE.Any');
    t.ok(typeof TYPE.Null != 'undefined', 'we have a Null TypeConstraint');
    t.ok(TYPE.Null._uses === TYPE.Any, 'Null TypeConstraint uses TYPE.Any');
    t.ok(typeof TYPE.Str != 'undefined', 'we have a Str TypeConstraint');
    t.ok(TYPE.Str._uses === TYPE.Any, 'Str TypeConstraint uses TYPE.Any');
    t.ok(typeof TYPE.Bool != 'undefined', 'we have a Bool TypeConstraint');
    t.ok(TYPE.Bool._uses === TYPE.Any, 'Bool TypeConstraint uses TYPE.Any');
    t.ok(typeof TYPE.Num != 'undefined', 'we have a Num TypeConstraint');
    t.ok(TYPE.Num._uses === TYPE.Any, 'Num TypeConstraint uses TYPE.Any');
    t.ok(typeof TYPE.Int != 'undefined', 'we have a Int TypeConstraint');
    t.ok(TYPE.Int._uses === TYPE.Num, 'Int TypeConstraint uses TYPE.Num');
    t.ok(typeof TYPE.Float != 'undefined', 'we have a Float TypeConstraint');
    t.ok(TYPE.Float._uses === TYPE.Num, 'Float TypeConstraint uses TYPE.Num');
    
    // uses TYPE.Obj
    t.ok(typeof TYPE.Array != 'undefined', 'we have a Array TypeConstraint');
    t.ok(TYPE.Array._uses === TYPE.Obj, 'Array TypeConstraint uses TYPE.Obj');
    t.ok(typeof TYPE.Func != 'undefined', 'we have a Func TypeConstraint');
    t.ok(TYPE.Func._uses === TYPE.Obj, 'Func TypeConstraint uses TYPE.Obj');
    t.ok(typeof TYPE.Date != 'undefined', 'we have a Date TypeConstraint');
    t.ok(TYPE.Date._uses === TYPE.Obj, 'Date TypeConstraint uses TYPE.Obj');
    
    t.ok(typeof TYPE.Joose != 'undefined', 'we have a Joose TypeConstraint');
    t.ok(TYPE.Joose._uses === TYPE.Obj, 'Joose TypeConstraint uses TYPE.Obj');
    
    //TODO(jwall): handler property tests for callbacks;
    return t;
};

r.run_tests(tests);

