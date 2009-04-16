var declared = false;
try {
	declared = typeof StressTest.Test014 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test014.meta.constructor == Joose.Meta.Class) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test014";
}

Class('StressTest.Test014', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test047',
	       'StressTest.Test053',
	       'StressTest.Test061',
	       'StressTest.Test062',
	       'StressTest.Test073',
	       'StressTest.Test088',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 14 }
	},
	
	body : function(){
			if (StressTest.Test032.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test047.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test053.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test061.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test088.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test014"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.Meta.Class) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test014"; 
			}
	}
})
