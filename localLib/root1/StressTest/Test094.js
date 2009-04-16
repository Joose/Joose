var declared = false;
try {
	declared = typeof StressTest.Test094 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test094.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test094";
}

Class('StressTest.Test094', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test095',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 94 }
	},
	
	body : function(){
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test094"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test094"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test094"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test094"; 
			}
			if (StressTest.Test099.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test094"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test094"; 
			}
	}
})
