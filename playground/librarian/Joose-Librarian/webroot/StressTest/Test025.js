var declared = false;
try {
	declared = typeof StressTest.Test025 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test025.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test025";
}

Class('StressTest.Test025', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test030',
	       'StressTest.Test035',
	       'StressTest.Test040',
	       'StressTest.Test068',
	       'StressTest.Test073',
	       'StressTest.Test086',
	       'StressTest.Test095',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 25 }
	},
	
	body : function(){
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test025"; 
			}
	}
})
