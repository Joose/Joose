(function () {
var testobj = new Test.TAP.Class();
testobj.plan(11)

testobj.testSingleton = function() {
    var t = this;
    t.diag("Sanity")
    t.ok(Joose,   "Joose is here");
    t.ok(Joose.Singleton,   "We have the singleton role");

    Class("MySingleton", {
        does: [Joose.Singleton],
    
        has: {
            test: {
                init: function () { return [] }
            }
        }
    })
    
    t.ok(MySingleton.getInstance, "getInstance method arrived")
    
    var single = MySingleton.getInstance();
    
    t.ok(single, "getInstance returns something")
    t.ok(single instanceof MySingleton, "created object has correct type")
    
    var second = MySingleton.getInstance();
    
    t.ok(single === second, "A second instance is identical to the first");
    
    t.throws_ok(function () {
        var instance = new MySingleton()
    }, 
      /The class MySingleton is a singleton. Please use the class method getInstance\(\)./, 
      "Using new on the singleton throws an error")

    var third = MySingleton.getInstance();
    
    t.ok(third === single, "A third instance is identical to the first");
    t.ok(third === second, "A third instance is identical to the second");
    
    Class("SingletonWithInit", {
        does: [Joose.Singleton],
        
        has: {
            foo: {
                init: 1
            }
        },
        
        methods: {
            singletonInitialize: function (foo) {
                this.foo = foo
            }
        }
    })
    
    var single = SingletonWithInit.getInstance(2);
    t.ok(single.foo === 2, "singletonInitialize is called an receives para");
    var single = SingletonWithInit.getInstance(3);
    t.ok(single.foo === 2, "singletonInitialize is only called upon first instantiation");
};

return testobj;
})()