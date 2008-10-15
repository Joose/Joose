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
    
    //TODO(jwall); self needs to live in a different namespace: Joose.Type
    //             and they should be exported?
    var undefined;
    
    self.ok(typeof TYPE.Any != 'undefined', 'we have a Any TypeConstraint');
    self.ok(TYPE.Any.validateBool(1), 'any validates a defined value');

    self.ok(typeof TYPE.Obj != 'undefined', 'we have a Obj TypeConstraint');
    self.ok(TYPE.Obj.validateBool({}), 'obj validates a object literal');
    self.diag(TYPE.Obj.validateBool(1)+'');
    self.ok(!TYPE.Obj.validateBool(1), 'obj does not validate a number literal');
    self.ok(TYPE.Obj._uses === TYPE.NotNull, 'Obj TypeConstraint uses TYPE.Any');
    
    self.ok(typeof TYPE.Null != 'undefined', 'we have a Null TypeConstraint');
    self.ok(TYPE.Null.validateBool(null), 'Null validates a null');
    self.ok(!TYPE.Null.validateBool(undefined), 'Null does not validate an undefined value');
    self.ok(!TYPE.Null.validateBool({}), 'Null does not validate an object');
    self.ok(TYPE.Null._uses === TYPE.Any, 'Null TypeConstraint uses TYPE.Any');
    
    self.ok(typeof TYPE.Str != 'undefined', 'we have a Str TypeConstraint');
    self.ok(TYPE.Str.validateBool(""), 'Str validates a String');
    self.ok(TYPE.Str.validateBool(new String()), 'Str validates a String Object');
    self.ok(!TYPE.Str.validateBool(1), 'Str does not validate a number literal');
    self.ok(TYPE.Str._uses === TYPE.NotNull, 'Str TypeConstraint uses TYPE.Any');
    
    self.ok(typeof TYPE.Num != 'undefined', 'we have a Num TypeConstraint');
    self.ok(TYPE.Num.validateBool(1), 'Num validates a number literal');
    self.ok(TYPE.Num.validateBool( new Number() ), 'Num validates a Number Object');
    self.ok(!TYPE.Num.validateBool(""), 'Num does not validate a String');
    self.ok(TYPE.Num._uses === TYPE.NotNull, 'Num TypeConstraint uses TYPE.Any');
    
    self.ok(typeof TYPE.Bool != 'undefined', 'we have a Bool TypeConstraint');
    self.ok(TYPE.Bool.validateBool(true), 'Bool validates true');
    self.ok(TYPE.Bool.validateBool(false), 'Bool validates false');
    self.ok(!TYPE.Bool.validateBool(1), 'Bool does not validate an number literal');
    self.ok(TYPE.Bool._uses === TYPE.NotNull, 'Bool TypeConstraint uses TYPE.Any');
    
    // uses TYPE.Num
    self.ok(typeof TYPE.Int != 'undefined', 'we have a Int TypeConstraint');
    self.ok(TYPE.Int.validateBool(1), 'Int validates 1');
    self.ok(!TYPE.Int.validateBool(1.1), 'Int does not validate 1.1');
    self.ok(!TYPE.Int.validateBool(.1), 'Int does not validate .1');
    self.ok(TYPE.Int._uses === TYPE.Num, 'Int TypeConstraint uses TYPE.Num');
    
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
    
    self.ok(typeof TYPE.Joose != 'undefined', 'we have a Joose TypeConstraint');
    self.ok(TYPE.Joose.validateBool( new BooleanTypeConstrained() ), 
        'Joose does validate a Joose Object');
    self.ok(!TYPE.Joose.validateBool( { } ), 
        'Joose does not validate a regular Object');
    self.ok(TYPE.Joose._uses === TYPE.Obj, 'Joose TypeConstraint uses TYPE.Obj');
    
};
return testobj
})()

