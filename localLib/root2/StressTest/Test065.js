var declared = false;
try {
	declared = typeof StressTest.Test065 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test065.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test065";
}

Class('StressTest.Test065', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test077',
	       'StressTest.Test079',
	       'StressTest.Test083',
	       'StressTest.Test086',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test092',
	       'StressTest.Test095',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 65 }
	},
	
	body : function(){
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test065"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test065"; 
			}
	}
})
