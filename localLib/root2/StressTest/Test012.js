var declared = false;
try {
	declared = typeof StressTest.Test012 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test012.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test012";
}

Class('StressTest.Test012', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test013',
	       'StressTest.Test021',
	       'StressTest.Test037',
	       'StressTest.Test038',
	       'StressTest.Test041',
	       'StressTest.Test048',
	       'StressTest.Test055',
	       'StressTest.Test065',
	       'StressTest.Test068',
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 12 }
	},
	
	body : function(){
			if (!StressTest.Test013.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test021.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test012"; 
			}
	}
})
