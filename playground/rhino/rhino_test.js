//mock the document
var document = {};

var loadlib = function(lib) {
    print('#loading: '+lib);
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

//get one test running uses Test.TAP
var extpath = root+'ext/';
loadlib(extpath+'Test/TAP.js');
loadlib(extpath+'Test/TAP/Runner.js');

loadlib(root+'tests/01_sanity.t');
