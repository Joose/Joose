var declared = false;
try {
	declared = typeof StressTest.Test082 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test082.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test082";
}

Class('StressTest.Test082', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test096',
	       'StressTest.Test098',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 82 }
	},
	
	body : function(){
			if (StressTest.Test085.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test082"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test082"; 
			}
	}
})
