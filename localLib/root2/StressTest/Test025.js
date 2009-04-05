var declared = false;
try {
	declared = typeof StressTest.Test025 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test025.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test025";
}

Class('StressTest.Test025', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test049',
	       'StressTest.Test062',
	       'StressTest.Test071',
	       'StressTest.Test076',
	       'StressTest.Test084',
	       'StressTest.Test095',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 25 }
	},
	
	body : function(){
			if (StressTest.Test044.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test049.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test076.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test025"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test025"; 
			}
	}
})
