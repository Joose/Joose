if (typeof StressTest.Test001 == 'function' && StressTest.Test001.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test001";
}

Class('StressTest.Test001', {
	use : [ 
	       'StressTest.Test006',
	       'StressTest.Test020',
	       'StressTest.Test049',
	       'StressTest.Test069',
	       'StressTest.Test076',
	       'StressTest.Test077',
	       'StressTest.Test083',
	       'StressTest.Test089',
	       'StressTest.Test095',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 1 }
	},
	
	body : function(){
			if (!StressTest.Test006.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test006 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test020.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test020 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test001"; 
			}
	}
})
