var declared = false;
try {
	declared = typeof StressTest.Test086 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test086.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test086";
}

Class('StressTest.Test086', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test096',
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 86 }
	},
	
	body : function(){
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test090.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test099.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test086"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test086"; 
			}
	}
})
