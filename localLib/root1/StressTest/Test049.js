var declared = false;
try {
	declared = typeof StressTest.Test049 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test049.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test049";
}

Class('StressTest.Test049', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test054',
	       'StressTest.Test062',
	       'StressTest.Test067',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test086',
	       'StressTest.Test092',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 49 }
	},
	
	body : function(){
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test049"; 
			}
	}
})
