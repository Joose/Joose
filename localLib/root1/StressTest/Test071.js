var declared = false;
try {
	declared = typeof StressTest.Test071 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test071.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test071";
}

Class('StressTest.Test071', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test072',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test083',
	       'StressTest.Test084',
	       'StressTest.Test089',
	       'StressTest.Test093',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 71 }
	},
	
	body : function(){
			if (StressTest.Test072.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test080.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test081.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test083.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test084.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test071"; 
			}
			if (StressTest.Test095.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test071"; 
			}
	}
})
