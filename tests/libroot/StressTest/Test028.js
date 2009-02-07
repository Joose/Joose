if (typeof StressTest.Test028 == 'function' && StressTest.Test028.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test028";
}

Class('StressTest.Test028', {
	use : [ 
	       'StressTest.Test030',
	       'StressTest.Test044',
	       'StressTest.Test049',
	       'StressTest.Test054',
	       'StressTest.Test056',
	       'StressTest.Test063',
	       'StressTest.Test071',
	       'StressTest.Test084',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 28 }
	},
	
	body : function(){
			if (!StressTest.Test030.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test030 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test028"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test028"; 
			}
	}
})
