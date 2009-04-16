var declared = false;
try {
	declared = typeof StressTest.Test026 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test026.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test026";
}

Class('StressTest.Test026', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test033',
	       'StressTest.Test036',
	       'StressTest.Test042',
	       'StressTest.Test043',
	       'StressTest.Test044',
	       'StressTest.Test045',
	       'StressTest.Test052',
	       'StressTest.Test056',
	       'StressTest.Test063',
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test075',
	       'StressTest.Test077',
	       'StressTest.Test088',
	       'StressTest.Test092',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 26 }
	},
	
	body : function(){
			if (StressTest.Test033.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test036.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test042.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test043.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test044.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test045.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test056.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test067.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test026"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test026"; 
			}
	}
})
