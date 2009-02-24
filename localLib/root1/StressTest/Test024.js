var declared = false;
try {
	declared = typeof StressTest.Test024 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test024.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test024";
}

Class('StressTest.Test024', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test033',
	       'StressTest.Test043',
	       'StressTest.Test046',
	       'StressTest.Test068',
	       'StressTest.Test082',
	       'StressTest.Test087',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 24 }
	},
	
	body : function(){
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test024"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test024"; 
			}
	}
})
