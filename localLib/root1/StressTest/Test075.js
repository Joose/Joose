var declared = false;
try {
	declared = typeof StressTest.Test075 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test075.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test075";
}

Class('StressTest.Test075', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test077',
	       'StressTest.Test080',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test095',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 75 }
	},
	
	body : function(){
			if (StressTest.Test077.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test087.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test092.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test094.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test097.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test075"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test075"; 
			}
	}
})
