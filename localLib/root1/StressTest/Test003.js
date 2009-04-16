var declared = false;
try {
	declared = typeof StressTest.Test003 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test003.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test003";
}

Class('StressTest.Test003', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test011',
	       'StressTest.Test031',
	       'StressTest.Test033',
	       'StressTest.Test035',
	       'StressTest.Test037',
	       'StressTest.Test042',
	       'StressTest.Test048',
	       'StressTest.Test050',
	       'StressTest.Test070',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test088',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 3 }
	},
	
	body : function(){
			if (StressTest.Test011.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test011 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test031.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test033.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test035.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test037.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test042.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test048.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test050.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test003"; 
			}
			if (StressTest.Test099.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test003"; 
			}
	}
})
