var declared = false;
try {
	declared = typeof StressTest.Test054 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test054.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test054";
}

Class('StressTest.Test054', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test055',
	       'StressTest.Test056',
	       'StressTest.Test059',
	       'StressTest.Test060',
	       'StressTest.Test062',
	       'StressTest.Test066',
	       'StressTest.Test078',
	       'StressTest.Test081',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 54 }
	},
	
	body : function(){
			if (StressTest.Test055.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test056.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test059.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test060.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test054"; 
			}
			if (StressTest.Test100.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test054"; 
			}
	}
})
