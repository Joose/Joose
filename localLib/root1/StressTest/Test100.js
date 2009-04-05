var declared = false;
try {
	declared = typeof StressTest.Test100 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test100.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test100";
}

Class('StressTest.Test100', {
	version : 0.1,
	
	use : [ 
	],
	
	methods : {
		result : function () { return 100 }
	},
	
	body : function(){
	}
})
