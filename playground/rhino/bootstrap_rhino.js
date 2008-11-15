
this.CHAOTIC_TRAVERSION_ORDER = true;


//library loading helper function
var loadlib = function(lib) {
    //print('#loading: '+lib);
    load(lib);
};

var root = '../../';
var path = root+'lib/';
loadlib(path+'Joose.js');

//now to load the components
var comps = Joose.prototype.components();
for ( x in comps ) {
    var file = comps[x].replace(/\./g, '/')+'.js';
    loadlib(path+file);
}

var extpath = root+'ext/';
loadlib(extpath+'Test/TAP.js');
loadlib(extpath+'Test/TAP/Runner.js');
loadlib(extpath+'Test/TAP/Class.js');
