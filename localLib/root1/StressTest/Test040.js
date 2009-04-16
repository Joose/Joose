var declared = false;
try {
	declared = typeof StressTest.Test040 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test040.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test040";
}

Class('StressTest.Test040', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test051',
	       'StressTest.Test060',
	       'StressTest.Test063',
	       'StressTest.Test077',
	       'StressTest.Test079',
	       'StressTest.Test086',
	       'StressTest.Test088',
	       'StressTest.Test091',
	       'StressTest.Test092',
	       'StressTest.Test096',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 40 }
	},
	
	body : function(){
			if (StressTest.Test051.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test060.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test077.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test079.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test096.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test040"; 
			}
			if (StressTest.Test099.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test040"; 
			}
	}
})
