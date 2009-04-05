var declared = false;
try {
	declared = typeof StressTest.Test002 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test002.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test002";
}

Class('StressTest.Test002', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test014',
	       'StressTest.Test021',
	       'StressTest.Test040',
	       'StressTest.Test044',
	       'StressTest.Test058',
	       'StressTest.Test082',
	       'StressTest.Test085'
	],
	
	methods : {
		result : function () { return 2 }
	},
	
	body : function(){
			if (StressTest.Test014.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test014 is not satisfied for class StressTest.Test002"; 
			}
			if (StressTest.Test021.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test002"; 
			}
			if (StressTest.Test040.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test002"; 
			}
			if (StressTest.Test044.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test002"; 
			}
			if (StressTest.Test058.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test002"; 
			}
			if (StressTest.Test082.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test002"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test002"; 
			}
	}
})
