plan(2)
    




diag("Testing Gears Support")

Class("HardWork", {
    meta: Joose.Gears,
    has: {
        data: {is: rw, init: {}}
    },
    methods: {
        onDoWork: function (result) {
            ok(result == 1001, "Gear Worker returns correct result")
            endTests()
        }
    },
    workers: {
        doWork: function (start) {
            var counter = start;
            for(var i = 0; i < 1000; i++) {
                counter++
            }
            return counter
        }
    }
})

var gt = new HardWork();
ok(gt.data, "Data member is here")

gt.doWork(1)