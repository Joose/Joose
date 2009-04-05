var declared = false;
try {
	declared = typeof StressTest.Test050 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test050.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test050";
}

Class('StressTest.Test050', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test056',
	       'StressTest.Test064',
	       'StressTest.Test065',
	       'StressTest.Test075',
	       'StressTest.Test080',
	       'StressTest.Test086',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 50 }
	},
	
	body : function(){
			if (StressTest.Test056.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test050"; 
			}
			if (StressTest.Test064.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test050"; 
			}
			if (StressTest.Test065.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test050"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test050"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test050"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test050"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test050"; 
			}
	}
})
