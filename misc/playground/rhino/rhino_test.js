load('bootstrap_rhino.js');

function runtest(test) {
    var f = readFile(root+'tests/' + test);
    var t = eval(f);
    t.run_tests(); 
}

var all = [
        '00_test_test.t.js',
        '01_sanity.t.js',
        '02_classcreation.t.js',
        '03_methods.t.js',
        '04_inheritance.t.js',
        '05_metaclass.t.js',
        '06_basic_examples.t.js',
        '07_roles.t.js',
        '08_joosify.t.js',
        '09_js_style_building.t.js',
        '10_method_wrappers.t.js',
        //'11_gears.t.js',
        '12_storage.t.js',
        '12_storage_jsonpickle.t.js',
        '13_attribute_meta_classes.t.js',
        '14_modules.t.js',
        '15_prototype.t.js',
        '16_types.t.js',
        //'17_meta_serialization.t.js',
        //'18_custom_builders.t.js',
        //'19_exceptions.t.js'
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
