plan(3)

Class("Point", {
    has: {
        x: {is: ro},
        y: {is: rw}
    },
    methods: {
        clear: function () {
            this.x = 0;
            this.setY(0);
        }
    }
})

Class("Point3D", {
    isa: Point,
    has: {
        z: {}
    },
    after: {
        clear: function () {
            this.z = 0;
        }
    }
})

var point = new Point3D();

point.x = 1;
point.setY(2);
point.z = 3;

ok(point.x == 1, "x is correct")
ok(point.y == 2, "y is correct")
ok(point.z == 3, "z is correct")

endTests()