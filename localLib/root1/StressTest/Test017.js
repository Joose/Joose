var declared = false;
try {
	declared = typeof StressTest.Test017 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test017.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test017";
}

Class('StressTest.Test017', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test026',
	       'StressTest.Test029',
	       'StressTest.Test062',
	       'StressTest.Test068',
	       'StressTest.Test087'
	],
	
	methods : {
		result : function () { return 17 }
	},
	
	body : function(){
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test026.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test017"; 
			}
	}
})
