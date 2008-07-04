plan(16);

Type("Integer", {
    where: /^-*\d+$/
})

ok(TYPE, "We have a TYPE Module");

ok(TYPE.Integer, "The new type is there");

ok(TYPE.Integer.validate(123), "It matches valid input")

fail(function () {TYPE.Integer.validate("hallo")}, "The passed value ", "It fails on invalid input")

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

fail(function () {MyTypes.PositiveInteger.validate(-10)}, "The passed value ", "It fails on invalid input (subtype)")
fail(function () {MyTypes.PositiveInteger.validate("hallo")}, "The passed value ", "It fails on invalid input (supertype)")

ok(MyTypes.PositiveInteger.validate("1325135"), "It validates valid input")
fail(function () {MyTypes.PositiveInteger.validate("123.12")}, "The passed value ", "It fails on invalid input ")

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

endTests()