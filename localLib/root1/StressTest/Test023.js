var declared = false;
try {
	declared = typeof StressTest.Test023 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test023.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test023";
}

Class('StressTest.Test023', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test040',
	       'StressTest.Test048',
	       'StressTest.Test054',
	       'StressTest.Test060',
	       'StressTest.Test071',
	       'StressTest.Test075',
	       'StressTest.Test079',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 23 }
	},
	
	body : function(){
			if (StressTest.Test040.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test048.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test054.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test060.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test023"; 
			}
			if (StressTest.Test090.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test023"; 
			}
	}
})
