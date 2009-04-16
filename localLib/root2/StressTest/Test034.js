var declared = false;
try {
	declared = typeof StressTest.Test034 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test034.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test034";
}

Class('StressTest.Test034', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test049',
	       'StressTest.Test051',
	       'StressTest.Test052',
	       'StressTest.Test053',
	       'StressTest.Test065',
	       'StressTest.Test073',
	       'StressTest.Test094',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 34 }
	},
	
	body : function(){
			if (StressTest.Test049.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test051.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test052.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test053.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test065.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test034"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test034"; 
			}
	}
})
