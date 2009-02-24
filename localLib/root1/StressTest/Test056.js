var declared = false;
try {
	declared = typeof StressTest.Test056 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test056.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test056";
}

Class('StressTest.Test056', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test060',
	       'StressTest.Test067',
	       'StressTest.Test082',
	       'StressTest.Test087',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 56 }
	},
	
	body : function(){
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test056"; 
			}
	}
})
