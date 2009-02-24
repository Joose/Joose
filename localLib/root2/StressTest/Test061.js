var declared = false;
try {
	declared = typeof StressTest.Test061 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test061.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test061";
}

Class('StressTest.Test061', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test064',
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test079',
	       'StressTest.Test081',
	       'StressTest.Test082',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test093',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 61 }
	},
	
	body : function(){
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test061"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test061"; 
			}
	}
})
