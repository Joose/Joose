plan(30)

// Shows a basic class with and without Joose

// Create a class called Point
Module("Test", function (m) {
    Class("Point", {
        has: {
            x: {
                is:   "rw",
                init: 0
            },
            y: {
                is:   "rw",
                init: 0
            }
        },
        methods: {
            clear: function () {
                this.setX(0);
                this.setY(0);
            }
        }
    })
})



// No Joose
if(Test == null) {
    Test = {};
}

Test.StandardPoint = function (x, y) {
    this.x = x || 0
    this.y = y || 0
}

Test.StandardPoint.prototype = {
    getX: function () {
        return this.x
    },
    setX: function (x) {
        this.x = x
    },
    getY: function () {
        return this.y
    },
    setY: function (y) {
        this.y = y;
    },
    clear: function () {
        this.setX(0)
        this.setY(0)
    }
}






// Use the class
var joosePoint    = new Test.Point()
var standardPoint = new Test.StandardPoint()

var objects       = [joosePoint, standardPoint]

Joose.A.each([joosePoint, standardPoint], function (point) {
    isEq(point.getX(), 0, "Init of x correct")
    isEq(point.getY(), 0, "Init of y correct")
    
    point.setX(10);
    point.setY(20);
    
    isEq(point.getX(), 10, "Set works")
    isEq(point.getY(), 20, "Set works")
    
    point.clear();
    
    isEq(point.getX(), 0, "Clear works")
    isEq(point.getY(), 0, "Clear works")
})


// Sub classes

Module("Test", function (m) {
    Class("Point3D", {
        isa: m.Point,
        has: {
            z: {
                is: "rw",
                init: 0
            }
        },
        after: {
            clear: function () {
                this.setZ(0)
            }
        }
    })
})

// We need a utility function to do the inheritance
function inherit(superClass, subClass) {
    for(var i in superClass.prototype) {
        subClass.prototype[i] = superClass.prototype[i]
    }
}

Test.StandardPoint3D = function (x, y, z) {
    this.x = x || 0
    this.y = y || 0
    this.z = z || 0
}

// Make Test.Standard the super class of Test.StandardPoint3D
inherit(Test.StandardPoint, Test.StandardPoint3D)

// we cant assign a new prototype because we already have the one from the super
Test.StandardPoint3D.prototype.getZ = function () {
    return this.z
}

Test.StandardPoint3D.prototype.setZ = function (z) {
    this.z = z;
}

var superMethod = Test.StandardPoint3D.prototype.clear;
Test.StandardPoint3D.prototype.clear = function () {
    superMethod.apply(this);
    this.z = 0;
}

var joosePoint    = new Test.Point3D()
var standardPoint = new Test.StandardPoint3D()

var objects       = [joosePoint, standardPoint]

Joose.A.each([joosePoint, standardPoint], function (point) {
    isEq(point.getX(), 0, "Init of x correct")
    isEq(point.getY(), 0, "Init of y correct")
    isEq(point.getZ(), 0, "Init of Z correct")
    
    point.setX(10);
    point.setY(20);
    point.setZ(30);
    
    isEq(point.getX(), 10, "Set works")
    isEq(point.getY(), 20, "Set works")
    isEq(point.getZ(), 30, "Set works")
    
    point.clear();
    
    isEq(point.getX(), 0, "Clear works")
    isEq(point.getY(), 0, "Clear works")
    isEq(point.getZ(), 0, "Set works")
})


endTests()