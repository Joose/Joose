var declared = false;
try {
	declared = typeof StressTest.Test005 == 'function';
} catch (e) {
	
}

if (declared && StressTest.Test005.meta.meta.isa(Joose.Class)) {
    StressTest.doubleDeclarations = true;
    throw "Double declaration of StressTest.Test005";
}

Class('StressTest.Test005', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test008',
	       'StressTest.Test026',
	       'StressTest.Test029',
	       'StressTest.Test030',
	       'StressTest.Test042',
	       'StressTest.Test070',
	       'StressTest.Test078',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 5 }
	},
	
	body : function(){
			if (!StressTest.Test008.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test008 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test026.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test005"; 
			}
	}
})
