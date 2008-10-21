(function() {
var t = new Test.TAP.Class();
t.plan(41)

t.testStorageRole = function() {
    var self = this; 
    self.diag("Testing Storage Role")
    
    self.skip(typeof(JSON) != 'undefined',
    'JSON is not defined',
    41,
    function() {
        self.ok(joose.top.JSON, "We have JSON")
        self.ok(JSON.parse && JSON.stringify, "It is the correct version of JSON (json2.js)")
        
        Geometry = {};
        Class("Geometry.Point", {
            does: Joose.Storage,
            has: {
                x: {is: 'rw'},
                y: {is: 'rw'},
                $: {
                    is:         'rw',
                    init:       "stuff",
                    persistent: false
                }
            }
        })
        
        var p = new Geometry.Point({x: 10, y: 20})
        
        p.set$("value")
        
        self.ok(p.getX() == 10, "Sanity: point x value is ok")
        self.ok(p.getY() == 20, "Sanity: point y value is ok")
        self.ok(p.get$() == "value", "Sanity: point extra prop is ok")
        
        var o = p.pack();
        
        self.ok(o.x == 10, "Serialized object has correct x value")
        self.ok(o.y == 20, "Serialized object has correct y value")
        self.ok(o.__CLASS__ == "Geometry::Point", "Serialized object has the correct class name")
        
        var p2 = Geometry.Point.unpack(o);
        
        self.ok(p2.getX() == 10, "After unpack: point x value is ok")
        self.ok(p2.getY() == 20, "After unpack: point y value is ok")
        self.ok(p2.get$() == "stuff", "After unpack: non persistent value is ok")
        var p3 = Geometry.Point.unpack(JSON.parse(JSON.stringify(p)));
        
        self.ok(p3.getX() == 10, "After JSON rountrip: point x value is ok (uses the toJSON method)")
        self.ok(p3.getY() == 20, "After JSON rountrip: point y value is ok (uses the toJSON method)")
        
        Class("Geometry.Rectangle", {
            does: Joose.Storage,
            has: {
                width:  {is: 'rw'},
                height: {is: 'rw'}
            }
        })
        
        self.throws_ok(function () {Geometry.Rectangle.unpack(o)}, 
            /Storage data is of wrong type/, 
            "Unpacking a point into a rectangle fails")
        self.throws_ok(function () {Geometry.Rectangle.unpack({width: 10, height: 20})}, 
            /Serialized data needs to include a __CLASS__ attribute./, 
            "Unpacking without __CLASS__ attribute fails correctly.")
        
        var rect = new Geometry.Rectangle({width: 100, height: 200});
        self.ok(rect.getWidth() == 100, "We can make Rectangles");
        var packed = rect.pack();
        self.ok(packed.__CLASS__ == "Geometry::Rectangle", "We are using :: as the Namespace separator")
        self.ok(Geometry.Rectangle.unpack, "Rectangles have unpack");
        self.ok(Geometry.Rectangle.unpack(packed).meta.className() == "Geometry.Rectangle", "And we can convert is back to the dot in JavaScript")
        
        var before = {
            test: [new Geometry.Point({x: 10, y: 20})],
            another: {a: 1}
        }
        
        var after = JSON.parse(JSON.stringify(before), Joose.Storage.Unpacker.jsonParseFilter);
        
        var p = after.test[0]
        
        self.ok(p, "There is something in the point spot");
        
        self.ok(p.x == 10, "X has the correct value");
        self.ok(p.getX, "getX method is there");
        self.ok(p.getX() == 10, "getX() retuns the correct value");
        self.ok(p.meta.className() == "Geometry.Point", "p is of correct type")
        
        self.diag("Patching JSON")
        Joose.Storage.Unpacker.patchJSON();
        var after = JSON.parse(JSON.stringify(before));
        
        var p = after.test[0]
        
        self.ok(p, "There is something in the point spot");
        
        self.ok(p.x == 10, "X has the correct value");
        self.ok(p.getX, "getX method is there");
        self.ok(p.getX() == 10, "getX() retuns the correct value");
        self.ok(p.meta.className() == "Geometry.Point", "p is of correct type");
        
        self.diag("Test with version (Right now we simply ignore it :)")
        var fromMoose = JSON.parse('{"__CLASS__":"Geometry::Point-0.01","y":10,"x":10}');
        self.ok(fromMoose.x == 10, "X has the correct value");
        self.ok(fromMoose.getX, "getX method is there");
        self.ok(fromMoose.getX() == 10, "getX() retuns the correct value");
        self.ok(fromMoose.meta.className() == "Geometry.Point", "p is of correct type");
        
        self.diag("JSON version of the Moose-JSON-Input: "+JSON.stringify(fromMoose));
        
        self.diag("Test identities")
        
        var p0 = new Geometry.Point({x: 10, y: 20})
        var p1 = new Geometry.Point({x: 20, y: 30})
        
        var test = {
            a: p0,
            b: p0,
            c: p1
        }
        
        self.diag(JSON.stringify(test))
        self.diag(JSON.stringify(test))
        
        
        var runs = []
        
        for(var i = 0; i < 3; i++) { // test this multiple times because global vars are involved
        
            var restore = JSON.parse(JSON.stringify(test))
            self.diag(restore.a)
            self.diag(restore.b)
            self.ok(restore.a === restore.b, "Identities are preserved across JSON boundaries")
            self.ok(restore.a !== restore.c, "Non identical objects are not identical")
        
            runs[i] = restore
        }
        
        self.ok(runs[0].a !== runs[1].a, "Multiple deserializations create multiple instances of the same object")
        self.ok(runs[0].a !== runs[1].b, "Multiple deserializations create multiple instances of the same object")
    });    
}

return t;
})()
