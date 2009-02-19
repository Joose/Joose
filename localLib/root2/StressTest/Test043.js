var declared = false;
try {
	declared = typeof StressTest.Test043 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test043.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test043";
}

Class('StressTest.Test043', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test048',
	       'StressTest.Test055',
	       'StressTest.Test057',
	       'StressTest.Test064',
	       'StressTest.Test067',
	       'StressTest.Test071',
	       'StressTest.Test073',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 43 }
	},
	
	body : function(){
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test043"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test043"; 
			}
	}
})
