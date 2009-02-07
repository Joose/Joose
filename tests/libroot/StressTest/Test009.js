if (typeof StressTest.Test009 == 'function' && StressTest.Test009.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test009";
}

Class('StressTest.Test009', {
	use : [ 
	       'StressTest.Test013',
	       'StressTest.Test021',
	       'StressTest.Test028',
	       'StressTest.Test058',
	       'StressTest.Test063',
	       'StressTest.Test070',
	       'StressTest.Test071',
	       'StressTest.Test091',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 9 }
	},
	
	body : function(){
			if (!StressTest.Test013.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test021.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test009"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test009"; 
			}
	}
})
