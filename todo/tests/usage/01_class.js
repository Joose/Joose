plan(3)

// Create a class called Point
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
        },
        stringify: function () {
            return ""+this.getX()+","+this.getY()
        }
    },
    classMethods: {
        makeNew: function () {
            return new Point()
        }
    }
})

// Use the class
var point = new Point();
point.setX(10)
point.setY(20);
point.clear();

isEq(point.x, 0, "Works");
isEq(point.y, 0, "Works");
isEq(""+point, "0,0", "Stringification works")

/*
Class("Car", {
    isa: Vehicle
})

Class("Integer", {
    does: Comparable
})
* */


endTests()