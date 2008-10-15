load('bootstrap_rhino.js');

function runtest(test) {
loadlib(root+'tests/' + test);
    
}

var all = [
    '01_sanity.t.js',
    '16_types.t.js',
];

if (arguments.length > 0) {
    for (t in arguments) {
        runtest(arguments[t]);
    }
} else {
    for (t in all) {
        runtest(all[t]);
    }
}
