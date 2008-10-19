var hash = '#'
function load(path) {
    var url = location.pathname + "?" + encodeURIComponent(path.replace(/^\.\//, ''))
    Test.TAP.prototype.diag('loading: '+path+' <a href="'+url+'">(run in a single window)</a>...');
    var req = new XMLHttpRequest();
    req.open("GET", path, false);
    req.send(null);
    if (req.readyState == 4) {
        var testobj = eval(req.responseText);
        return testobj;
    }
}

function createScriptTag(library) {
    var path = library.replace(/\./g, '/')+'.js';
    var script = document.createElement("script");
    script.src = lib+'/'+path;
    return script; 
}

function loadlib(library) {
    document.body.appendChild(createScriptTag(library));
}

function loadTest(test) {
    var path = testlib+'/'+test;
    return load(path);
}

function loadComponents() {
    for (c in toLoad) {
        var comp = toLoad[c];
        loadlib(comp);
    }
}

function runtest(t) {
    var outtxt = "";
    var div = document.createElement("div");
    
    var onclick = function () {
        var c = div.className;
        if (c.match(/big/)) {
            c = c.replace(/big/, "small");
        } else if (c.match(/small/)) {
            c = c.replace(/small/, "big");
        }
        div.className = c;
    };
    div.addEventListener('click', onclick, true);

    div.className = 'test small';
    document.body.appendChild(div);
    
    var outfunc = function(text) {
        if (text) {
            outtxt += text;
            div.innerHTML = div.innerHTML + "\n" + text + "<br />"
        }
    }
    
    // set globally for synchronous run
    Test.TAP.prototype.out = outfunc;
    var testobj = loadTest(t);
    if (!testobj) {
        alert ("Test Object: "+t+" did not load");
        throw new ReferenceError("Test Object did now load");
    }
    // also set to instance for asynchronous output
	testobj.out = outfunc

    testobj.on_finished = function () {
    	if (outtxt.match(/(not ok|Test Suite Crashed)/g) ) {
    	    div.className += ' fail';
            div.className.replace(/small/, 'big');
    	} else {
    	    div.className += ' pass';
    	}
    	results.push(div);
    }

	setTimeout(function () {
    	testobj.run_tests()
	}, 0)
}

var test = loc.match(/.+[#?](.*)\??.*/);

loadComponents();

window.onload = function() {
    var testlist = [];
    if (test) {
        runtest(test[1]);
    } else {
        for (t in tests) {
            runtest(tests[t]);
        }
    }
}
