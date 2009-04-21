
    function loadScriptFile(src) {
        document.write("<script type='text/javascript' src='"+src+"'><"+"/script>\n")
    }

    var loc     = new String(location.hash);
    if(loc.indexOf("libmode=single") != -1) {
        loadScriptFile("../joose.js")
    }
    else if(loc.indexOf("libmode=mini") != -1) {
        loadScriptFile("../joose.mini.js")
    }
    else {
        
        for (var i = 0; i < JooseComponents.length; i++) {
            var url = '../lib/' + JooseComponents[i].replace(/\./g,'/') + '.js';
            loadScriptFile(url);
        }
    }
   
    