var declared = false;
try {
	declared = typeof StressTest.Test035 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test035.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test035";
}

Class('StressTest.Test035', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test038',
	       'StressTest.Test050',
	       'StressTest.Test054',
	       'StressTest.Test057',
	       'StressTest.Test063',
	       'StressTest.Test066',
	       'StressTest.Test071',
	       'StressTest.Test075',
	       'StressTest.Test078',
	       'StressTest.Test086',
	       'StressTest.Test091',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 35 }
	},
	
	body : function(){
			if (StressTest.Test038.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test050.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test054.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test057.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test063.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test066.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test071.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test086.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test035"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test035"; 
			}
	}
})
