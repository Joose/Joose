var declared = false;
try {
	declared = typeof StressTest.Test041 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test041.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test041";
}

Class('StressTest.Test041', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test045',
	       'StressTest.Test049',
	       'StressTest.Test052',
	       'StressTest.Test055',
	       'StressTest.Test057',
	       'StressTest.Test063',
	       'StressTest.Test070',
	       'StressTest.Test072',
	       'StressTest.Test082',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 41 }
	},
	
	body : function(){
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test041"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test041"; 
			}
	}
})
