var declared = false;
try {
	declared = typeof StressTest.Test027 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test027.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test027";
}

Class('StressTest.Test027', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test041',
	       'StressTest.Test050',
	       'StressTest.Test054',
	       'StressTest.Test056',
	       'StressTest.Test057',
	       'StressTest.Test066',
	       'StressTest.Test068',
	       'StressTest.Test075',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 27 }
	},
	
	body : function(){
			if (StressTest.Test041.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test050.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test054.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test056.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test027"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test027"; 
			}
	}
})
