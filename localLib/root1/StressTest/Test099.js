var declared = false;
try {
	declared = typeof StressTest.Test099 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test099.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test099";
}

Class('StressTest.Test099', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 99 }
	},
	
	body : function(){
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test099"; 
			}
	}
})
