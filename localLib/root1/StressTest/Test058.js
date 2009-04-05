var declared = false;
try {
	declared = typeof StressTest.Test058 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test058.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test058";
}

Class('StressTest.Test058', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test060',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test089',
	       'StressTest.Test092',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 58 }
	},
	
	body : function(){
			if (StressTest.Test060.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test070.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test074.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test076.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test082.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test058"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test058"; 
			}
	}
})
