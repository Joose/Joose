var declared = false;
try {
	declared = typeof StressTest.Test038 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test038.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test038";
}

Class('StressTest.Test038', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test042',
	       'StressTest.Test043',
	       'StressTest.Test044',
	       'StressTest.Test061',
	       'StressTest.Test062',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test077',
	       'StressTest.Test094',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 38 }
	},
	
	body : function(){
			if (StressTest.Test042.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test043.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test044.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test061.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test038"; 
			}
			if (StressTest.Test099.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test038"; 
			}
	}
})
