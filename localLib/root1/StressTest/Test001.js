var declared = false;
try {
	declared = typeof StressTest.Test001 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test001.meta.meta.isa(Joose.Class)) {
    __global__.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test001";
}

Class('StressTest.Test001', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test002',
	       'StressTest.Test007',
	       'StressTest.Test015',
	       'StressTest.Test024',
	       'StressTest.Test035',
	       'StressTest.Test067',
	       'StressTest.Test080'
	],
	
	methods : {
		result : function () { return 1 }
	},
	
	body : function(){
			if (!StressTest.Test002.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test002 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test007.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test007 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test015.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test024.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				__global__.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test001"; 
			}
	}
})
