if (typeof StressTest.Test025 == 'function' && StressTest.Test025.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test025";
}

Class('StressTest.Test025', {
	use : [ 
	       'StressTest.Test028',
	       'StressTest.Test029',
	       'StressTest.Test031',
	       'StressTest.Test033',
	       'StressTest.Test039',
	       'StressTest.Test060',
	       'StressTest.Test066',
	       'StressTest.Test071',
	       'StressTest.Test073',
	       'StressTest.Test076'
	],
	
	methods : {
		result : function () { return 25 }
	},
	
	body : function(){
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test025"; 
			}
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test025"; 
			}
	}
})
