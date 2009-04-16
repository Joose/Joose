var declared = false;
try {
	declared = typeof StressTest.Test036 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test036.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test036";
}

Class('StressTest.Test036', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test047',
	       'StressTest.Test056',
	       'StressTest.Test061',
	       'StressTest.Test072',
	       'StressTest.Test075',
	       'StressTest.Test085',
	       'StressTest.Test091',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 36 }
	},
	
	body : function(){
			if (StressTest.Test047.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test056.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test061.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test072.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test075.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test085.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test091.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test036"; 
			}
			if (StressTest.Test098.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test036"; 
			}
	}
})
