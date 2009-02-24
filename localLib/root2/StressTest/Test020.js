var declared = false;
try {
	declared = typeof StressTest.Test020 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test020.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test020";
}

Class('StressTest.Test020', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test024',
	       'StressTest.Test026',
	       'StressTest.Test029',
	       'StressTest.Test041',
	       'StressTest.Test066',
	       'StressTest.Test070',
	       'StressTest.Test075',
	       'StressTest.Test084',
	       'StressTest.Test094',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 20 }
	},
	
	body : function(){
			if (!StressTest.Test024.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test026.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test020"; 
			}
	}
})
