Test.TAPBrowser = function (path, tests) {
    this.test_path = path;
    
    this.parseLocation()
    
    if(this.params.test) {
        this.tests  = [this.params.test];
    } else {
        this.tests  = tests
    }
    
    if(this.params.real_world) {
        var world = new Test.RealWorld()
        world[this.params.real_world]()
    }
}

Test.TAPBrowser.prototype = {
        
    parseLocation: function () {
        var info  = {};
        var hash  = new String(location.hash)
        if(hash.length > 1) {
            var parts = hash.substr(1).split(";")
            for(var i = 0; i < parts.length; i++) {
                var pair = parts[i].split("=");
                info[pair[0]] = pair[1]
            }
        }
        this.params = info;
    },

    loadTest: function (t) {
    
        var path = this.createPath(t);
    
        var url = location.pathname + "#test=" + encodeURIComponent(path.replace(/^\.\//, ''))
        Test.TAP.prototype.diag('loading: '+path+' <a href="'+url+'">(run in a single window)</a>...');
    
        var req;
        if(navigator.appName == 'Microsoft Internet Explorer') {
            req = new ActiveXObject("Microsoft.XMLHTTP");
        } else {
            req = new XMLHttpRequest();
        } 
        if(!req) throw "Can't create XML HTTP Request Object"
        req.open("GET", path, false);
        req.send(null);
        
        // TODO is this AJAX Impl. robust enough?
        if (req.readyState == 4) {
            if(window && window.console && console.log) {
                console.log("Evaluating test file "+path)
            }
            var testobj;
            try {
                var js = req.responseText;
                // TODO this needs to be added to every source file instead
                js = "(function (Class, Module, Role, Type, Prototype) {\nreturn "+js+"\n}).call(window, JooseClass, JooseModule, JooseRole, JooseType, JoosePrototype)"
                testobj = eval(js);
            } catch(e) {
                throw(e)
            }
            return testobj;
        }
    },

    createPath: function (t) {
        var path = this.test_path +'/'+t;
        return path
    },

    runTest: function (t) {
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

        if(div.addEventListener) {
            div.addEventListener('click', onclick, true);
        } else if(div.attachEvent) {
            div.attachEvent('onclick', onclick);
        } else {
            throw "Can't attach event without addEventListener or attachEvent";
        }

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
        var testobj = this.loadTest(t);
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
    },
    
    run: function () {
        for (var i = 0; i < this.tests.length; i++) {
            var t = this.tests[i]
            this.runTest(t)
        }
    }

}



