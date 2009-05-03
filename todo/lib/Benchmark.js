// Benchmarking Class
Class("Joose.Benchmark", {
    has: {
        iterations: {},
        func:       {},
        desc:        {}
    },
    methods: {
        initialize: function (iterations, desc, func) {
            this.iterations = iterations;
            this.func       = func;
            this.desc       = desc;
        },
        run: function () {
            var func       = this.func;
            var iterations = this.iterations;
            var start = new Date().getTime();
            for(var i = 0; i < iterations; i++) {
                func();
            }
            var end   = new Date().getTime();
            return (end - start) / 1000;
        },
        
        report: function () {
            var result = this.run()
            var perSec = Math.round(this.iterations / result);
            return ""+this.desc + " over "+this.iterations+" iterations took "+result+" seconds ("+perSec+" iterations per second)";
        }
    }
})