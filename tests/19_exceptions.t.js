(function (Class, Module, Role, Type, Prototype) {
return (function () {
var t = new Test.TAP.Class();
t.plan(4)

t.testExceptions = function() {
    var self = this;

    self.skip(typeof Joose.Exception == 'undefined',
        'Joose.Exception does not exist',
        function() {
            self.ok(Joose.Exception, "The class Joose.Exception exists")
            //ok(Joose.Exception.meta, "The class Joose.Exception has a meta class")
            
            function printStackTrace(e) {
            
                var msg = e.name + ":" + e.message;
            
                if (e.fileName) {
                    msg += " at " + e.fileName + ":" + e.lineNumber;
                }
                console.log(msg);
            
                if (e.stack) {
                    // Extract Firefox stack information. This tells how you ended up
                    // to the exception in the first place. I didn't find
                    // instructions how to parse this stuff.
                    console.log(e.stack);
                }
            }
            
            try {
                throw new Error(new Joose.Exception("Test"))
            } catch(e) {
                var message = e.message + ""
                self.ok(message === "Test", "Stringified message is correct")
                self.ok(e.message instanceof Joose.Exception, "Message is actually a Joose.Exception")
                self.ok(e.message.meta.isa(Joose.Exception), "Meta interface is active")
            }
        }
    );
}

return t;
})()
}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)
