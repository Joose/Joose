if (typeof StressTest.Test007 == 'function' && StressTest.Test007.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test007";
}

Class('StressTest.Test007', {
	use : [ 
	       'StressTest.Test017',
	       'StressTest.Test036',
	       'StressTest.Test040',
	       'StressTest.Test053',
	       'StressTest.Test054',
	       'StressTest.Test062',
	       'StressTest.Test075',
	       'StressTest.Test084',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 7 }
	},
	
	body : function(){
			if (!StressTest.Test017.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test017 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test007"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test007"; 
			}
	}
})
