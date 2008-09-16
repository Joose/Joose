plan(43)

diag("Testing Storage Role")

ok(joose.top.JSON, "We have JSON")
ok(JSON.parse && JSON.stringify, "It is the correct version of JSON (json2.js)")

Geometry = {};
Class("Geometry.Point", {
    does: Joose.Storage.jsonpickle,
    has: {
        x: {is: rw},
        y: {is: rw},
        extra: {
            is:         rw,
            init:       "stuff",
            persistent: false
        }
    }
})

var p = new Geometry.Point({x: 10, y: 20})

p.setExtra("value")

ok(p.getX() == 10, "Sanity: point x value is ok")
ok(p.getY() == 20, "Sanity: point y value is ok")
ok(p.getExtra() == "value", "Sanity: point extra prop is ok")

var o = p.pack();

ok(o.x == 10, "Serialized object has correct x value")
ok(o.y == 20, "Serialized object has correct y value")
ok(o.classname__ == "Point", "Serialized object has the correct class name")
ok(o.classmodule__ == "Geometry", "Serialized object has the correct module name")

var p2 = Geometry.Point.unpack(o);

ok(p2.getX() == 10, "After unpack: point x value is ok")
ok(p2.getY() == 20, "After unpack: point y value is ok")
ok(p2.getExtra() == "stuff", "After unpack: non persistent value is ok")
diag("Testing packing via JSON")
var s      = JSON.stringify(p);
diag("stringify ok")
var parsed = JSON.parse(s)
diag("parse ok")
var p3     = Geometry.Point.unpack(parsed);

ok(p3.getX() == 10, "After JSON rountrip: point x value is ok (uses the toJSON method)")
ok(p3.getY() == 20, "After JSON rountrip: point y value is ok (uses the toJSON method)")

Class("Geometry.Rectangle", {
    does: Joose.Storage.jsonpickle,
    has: {
        width:  {is: rw},
        height: {is: rw}
    }
})

fail(function () {Geometry.Rectangle.unpack(o)}, "Storage data is of wrong type", "Unpacking a point into a rectangle fails")
fail(function () {Geometry.Rectangle.unpack({width: 10, height: 20})}, "Serialized data needs to include a __CLASS__ attribute.", "Unpacking without __CLASS__ attribute fails correctly.")

var rect = new Geometry.Rectangle({width: 100, height: 200});
ok(rect.getWidth() == 100, "We can make Rectangles");
var packed = rect.pack();
ok(Geometry.Rectangle.unpack, "Rectangles have unpack");
ok(Geometry.Rectangle.unpack(packed).meta.className() == "Geometry.Rectangle", "And we can convert is back to the dot in JavaScript")

var before = {
    test: [new Geometry.Point({x: 10, y: 20})],
    another: {a: 1}
}

diag(JSON.stringify(before))

var after = JSON.parse(JSON.stringify(before), Joose.Storage.Unpacker.jsonpickle.jsonParseFilter);

var p = after.test[0]

ok(p, "There is something in the point spot");

ok(p.x == 10, "X has the correct value");
ok(p.getX, "getX method is there");
ok(p.getX() == 10, "getX() retuns the correct value");
ok(p.meta.className() == "Geometry.Point", "p is of correct type")

diag("Patching JSON")
Joose.Storage.Unpacker.jsonpickle.patchJSON();
var after = JSON.parse(JSON.stringify(before));

var p = after.test[0]

ok(p, "There is something in the point spot");

ok(p.x == 10, "X has the correct value");
ok(p.getX, "getX method is there");
ok(p.getX() == 10, "getX() retuns the correct value");
ok(p.meta.className() == "Geometry.Point", "p is of correct type");

diag("Test with version (Right now we simply ignore it :)")
var fromJsonpickle = JSON.parse('{"classname__":"Point", "classmodule__": "Geometry","y":10,"x":10}');
ok(fromJsonpickle.x == 10, "X has the correct value");
ok(fromJsonpickle.getX, "getX method is there");
ok(fromJsonpickle.getX() == 10, "getX() retuns the correct value");
ok(fromJsonpickle.meta.className() == "Geometry.Point", "p is of correct type");

diag("JSON version of the jsonpickle-Input: "+JSON.stringify(fromJsonpickle));

diag("Test identities")

var p0 = new Geometry.Point({x: 10, y: 20})
var p1 = new Geometry.Point({x: 20, y: 30})

var test = {
    a: p0,
    b: p0,
    c: p1
}

diag(JSON.stringify(test))
diag(JSON.stringify(test))


var runs = []

for(var i = 0; i < 3; i++) { // test this multiple times because global vars are involved

    var restore = JSON.parse(JSON.stringify(test))
    diag(restore.a)
    diag(restore.b)
    ok(restore.a === restore.b, "Identities are preserved across JSON boundaries")
    ok(restore.a !== restore.c, "Non identical objects are not identical")

    runs[i] = restore
}

ok(runs[0].a !== runs[1].a, "Multiple deserializations create multiple instances of the same object")
ok(runs[0].a !== runs[1].b, "Multiple deserializations create multiple instances of the same object")

// Usage

// 

Module("jsonpickle.tests.classes", function () {
    Class("Thing", {
        does: Joose.Storage.jsonpickle,
        has: {
            child: {
                is: "rw"
            },
            name: {
                is: "rw"
            }
        }
    })
})

var thing = JSON.parse('{"child": "Robert", "classname__": "Thing", "name": "A String", "classmodule__": "jsonpickle.tests.classes"}');

ok(thing.getChild() == "Robert", "child has correct value")
ok(thing.getName() == "A String", "name has correct value")



endTests()
