var declared = false;
try {
	declared = typeof StressTest.Test046 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test046.meta.constructor == Joose.MetaClass) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test046";
}

Class('StressTest.Test046', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test048',
	       'StressTest.Test062',
	       'StressTest.Test068',
	       'StressTest.Test073',
	       'StressTest.Test076',
	       'StressTest.Test078',
	       'StressTest.Test083',
	       'StressTest.Test089',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 46 }
	},
	
	body : function(){
			if (StressTest.Test048.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test062.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test068.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test073.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test076.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test078.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test083.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test089.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test046"; 
			}
			if (StressTest.Test093.meta.constructor != Joose.MetaClass) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test046"; 
			}
	}
})
