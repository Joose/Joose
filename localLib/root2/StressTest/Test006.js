var declared = false;
try {
	declared = typeof StressTest.Test006 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test006.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test006";
}

Class('StressTest.Test006', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test008',
	       'StressTest.Test023',
	       'StressTest.Test039',
	       'StressTest.Test046',
	       'StressTest.Test049',
	       'StressTest.Test050',
	       'StressTest.Test054',
	       'StressTest.Test069',
	       'StressTest.Test082',
	       'StressTest.Test091',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 6 }
	},
	
	body : function(){
			if (StressTest.Test008.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test008 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test023.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test039.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test046.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test049.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test050.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test054.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test082.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test006"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test006"; 
			}
	}
})
