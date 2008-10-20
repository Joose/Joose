load('bootstrap_rhino.js');

function runtest(test) {
    var f = readFile(root+'tests/' + test);
    var t = eval(f);
    t.run_tests(); 
}

var all = [
    '01_sanity.t.js',
    '07_roles.t.js',
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
