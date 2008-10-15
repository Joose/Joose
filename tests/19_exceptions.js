plan(10)

ok(Joose.Exception, "The class Joose.Exception exists")
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
    ok(message === "Test", "Stringified message is correct")
    ok(e.message instanceof Joose.Exception, "Message is actually a Joose.Exception")
    ok(e.message.meta.isa(Joose.Exception), "Meta interface is active")
}


endTests()