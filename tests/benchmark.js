
function benchmark () {

function RegularCounter () {
    this.counter = 0
}

RegularCounter.prototype = {
    add: function () {
        this.counter++
    }
}

Class("JooseCounter", {
    has: {
        counter: { init: 1 }
    },
    methods: {
        add: function () {
            this.counter++
        }
    }
})

Class("WrappedCounter", {
    isa: JooseCounter,
    override: {
        add: function () {
            this.SUPER();
            this.counter++
        }
    }
})

var r  = new RegularCounter();
var j  = new JooseCounter();

diag("Method Calls")
var b1 = new Joose.Benchmark(100000, "Regular method calls", function () { r.add() } )
var b2 = new Joose.Benchmark(100000, "Joose method calls",   function () { j.add() } )

say(b1.report());
say(b2.report());

diag("Object Creation")
var b1 = new Joose.Benchmark(100000, "Regular object creation", function () { var r = new RegularCounter() } )
var b2 = new Joose.Benchmark(100000, "Joose object creation",   function () { var j = new JooseCounter() } )

say(b1.report());
say(b2.report());

diag("Before Wrapper")

var j = new JooseCounter();
var w = new WrappedCounter();

var b1 = new Joose.Benchmark(100000, "Direct method call", function () { j.add() } )
var b2 = new Joose.Benchmark(100000, "Method call with override method modifier",   function () { w.add() } )

say(b1.report());
say(b2.report());

}