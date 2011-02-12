var Harness

if (typeof process != 'undefined' && process.pid) {
    require('Task/Test/Run/NodeJSBundle')
    
    Harness = Test.Run.Harness.NodeJS
} else
    Harness = Test.Run.Harness.Browser.ExtJS

    
Harness.configure({
	title           : 'Joose test suite',
    
    verbosity       : 0,
	
//    transparentEx   : true,
//    runCore         : 'sequential',
    
	preload : [
	    'Task.Joose.Core'
    ]
})


Harness.start(
    '001_helpers.t.js',
    '010_proto_class.t.js',
    '011_propertyset.t.js',
    '012_propertyset_mutable.t.js',
    '020_managed_class.t.js',
    '021_method_modifiers.t.js',
    '022_inheriting_from_proto_class.t.js',
    '023_builder_stem_inheritance.t.js',
    '024_builder_stem_inheritance.t.js',
    '031_managed_role.t.js',
    '032_role_application_basic.t.js',
    '033_role_application_sugar.t.js',
    '040_my_symbiont.t.js',
    '041_my_mutation.t.js',
    '045_role_builder.t.js',
    '050_helpers.t.js',
    '051_advanced_attribute.t.js',
    '052_advanced_attribute.t.js',
    '052_role_application_advanced.t.js',
    '052_adv_attr_in_metaclasses.t.js',
    '052_advanced_attribute_set_raw_inlining.t.js',
    '053_using_class_as_role.t.js',
    '054_meta_roles.t.js',
    '055_role_to_instance_application.t.js',
    '056_arbitrary_object_from_constructor.t.js',
    '060_modules.t.js',
    '061_modules.t.js',
    '070_reflection.t.js',
    '071_reflection_current_method.t.js',
    '080_non_joose_inheritance.t.js',
    '090_sanity_checks.t.js'
)

