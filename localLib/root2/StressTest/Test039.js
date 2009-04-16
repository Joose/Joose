var declared = false;
try {
	declared = typeof StressTest.Test039 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test039.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test039";
}

Class('StressTest.Test039', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test049',
	       'StressTest.Test051',
	       'StressTest.Test054',
	       'StressTest.Test057',
	       'StressTest.Test069',
	       'StressTest.Test071',
	       'StressTest.Test081',
	       'StressTest.Test086',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 39 }
	},
	
	body : function(){
			if (StressTest.Test049.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test051.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test054.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test069.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test039"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test039"; 
			}
	}
})
