if (typeof StressTest.Test058 == 'function' && StressTest.Test058.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test058";
}

Class('StressTest.Test058', {
	use : [ 
	       'StressTest.Test063',
	       'StressTest.Test068',
	       'StressTest.Test070',
	       'StressTest.Test072',
	       'StressTest.Test074',
	       'StressTest.Test078',
	       'StressTest.Test083',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 58 }
	},
	
	body : function(){
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test058"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test058"; 
			}
	}
})
