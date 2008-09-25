var TODO_TESTS = false

if(window.$ == null) {
    function $(id) {
        return document.getElementById(id)
    }
}


var totalTestCounter = 0;
var totalTestErrors  = 0;
var totalTestCount   = 0;

function nofail(func, msg) {
    try {
        func()
        ok(true, msg)
    } catch (e) {
        ok(false, msg);
        diag(e)
    }
}

function fail(func, errorMsgPart, msg) {
    todo(isIE(), "Exceptions not catchable in IE, but program terminates properly, so no worries", function () {
        try {
            func()
        } catch(e) {
            var ex = new String(e);
            if(e.message != null) {
                ex = new String(e.message)
            }
            if(ex.indexOf(errorMsgPart) != -1) {
                ok(true, msg)
                return
            } else {
                ok(false, msg + " [Wrong error: "+ex+"]")
                return
            }
        }
        ok(false, msg + " [No error]")
    })
}

function isaOk(obj, c) {
    ok(obj.meta.isa(c), "object isa "+c)
}

function canOk(obj, methodName) {
    ok(obj.meta.can(methodName), ""+obj+" can "+methodName)
}

function classCanOk(obj, methodName) {
    ok(obj.meta.classCan(methodName), ""+obj+" can "+methodName)
}


function plan(count) {
    testCount   = count
    testCounter = 0;
    testErrors  = 0;
    say("<hr />");
    
    if(window.parent) {
    	window.parent.totalTests += count;
    	if(window.parent.draw) {
    		window.parent.draw()
    	}
    }
}

function say(msg) {
	if(window.isDotNet) {
		print(msg);
	} else {
    	var log = $("testLog");
    	log.innerHTML = msg + "<br />\n" +log.innerHTML
	}
}

function diag(msg) {
    say("# " + msg)
}

function ok(bool, msg) {
    
    var output = "" + (testCounter+1) + (msg ? (" - " + msg) : "")
    if(bool) {
        if(TODO_TESTS) {
            say("Unexpected success!")
        }
        say("OK "+output)
    } else {
        if(TODO_TESTS) {
            say("OK "+output+" - "+TODO_TESTS )
        } else {
            say("<span style='color: red'>NOT OK "+output+"</span>")
            testErrors++
        }
    }
    testCounter++
}

function dump(o) {
    Joose.O.each(o, function(value,name) {
        say("<pre>"+name+" -> "+value+"</pre>")
    })
}

function isNull(v, msg) {
    if(v == null) {
        ok(true, msg)
    } else {
        ok(false, msg)
    }
}

function isEq(a, b, msg) {
    ok(a == b, msg)
}

function isEqEq(a, b, msg) {
    ok(a === b, msg)
}

function isNotEq(a, b, msg) {
    ok(a != b, msg)
}

function jsonEq(a, b, msg) {
    ok(JSON.stringify(a) == JSON.stringify(b), msg)
}

function todo(condition, why, testFunction) {
    
    if(condition) {
        TODO_TESTS = why
        window.onerror = function () { return false }
        try {
            testFunction()
        } catch(e) {
            diag("Error: "+e)
        }
        window.onerror = null
        TODO_TESTS = false
    } else {
        testFunction()
    }
}

function isIE() {
    return document.all ? true : false
}
function has__proto__() {
    var test = function () {};
    var o = new test();
    return o.__proto__ ? true : false
}

function testReport() {
    say("<hr />")
    var color = "green";
    if(totalTestErrors > 0) {
        color = "red"
    }
    say("Tests done.")
    say("<strong><span style='color:"+color+"'>Ran "+totalTestCounter+" of "+totalTestCount+" tests and failed "+totalTestErrors+" tests.</span></strong>")
}

function endTests() {
    if(testCount) {
        var message = "All tests successfull.";
        
        var inFrame =  window.parent && window.parent !== window;
        
        if(testErrors > 0) {
            totalTestErrors += testErrors
            message = ""+testErrors + " tests failed."
            
            if(inFrame) {
                window.parent.document.body.style.backgroundColor = "red"
                
                window.parent.totalErrors += testErrors;

                window.parent.draw()
            }
        } else {
            
            if(inFrame) {
                if(window.parent.document.body.style.backgroundColor != "red") {
                    window.parent.document.body.style.backgroundColor = "green"
                }
            }
        }
        
        if(inFrame) {
        	 window.parent.totalTestsRan += testCount;
             window.parent.draw()
        }
        
        totalTestCount   += testCount
        totalTestCounter += testCounter
        
        diag("Ran "+testCounter+" of "+testCount+" tests. " + message)
        
    }
}

function runTestFile(url) {
    
    var html = '<h2>Testfile: '+url+'</h2><iframe width=100% height=200 src="test_runner.html?'+url+'&'+location.search.replace(/\?/, '')+'"></iframe>'
    
    var div = document.createElement("div");
    div.className = "test"
    div.innerHTML = html;
    document.body.appendChild(div)
}

function doTestFile(url) {
    
    /*var script = new Joose.SimpleRequest().getText(url);
    
    script = "(function () {"+script+"})()"
    
    eval(script);
    */
    var script = document.createElement("script");
    script.src = url;
    document.body.appendChild(script)
}