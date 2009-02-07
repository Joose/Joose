if (typeof StressTest.Test097 == 'function' && StressTest.Test097.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test097";
}

Class('StressTest.Test097', {
	use : [ 
	       'StressTest.Test098',
	       'StressTest.Test099',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 97 }
	},
	
	body : function(){
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test097"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test097"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test097"; 
			}
	}
})
