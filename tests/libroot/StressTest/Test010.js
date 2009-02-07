if (typeof StressTest.Test010 == 'function' && StressTest.Test010.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test010";
}

Class('StressTest.Test010', {
	use : [ 
	       'StressTest.Test018',
	       'StressTest.Test027',
	       'StressTest.Test034',
	       'StressTest.Test041',
	       'StressTest.Test044',
	       'StressTest.Test045',
	       'StressTest.Test049',
	       'StressTest.Test070',
	       'StressTest.Test079',
	       'StressTest.Test082',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 10 }
	},
	
	body : function(){
			if (!StressTest.Test018.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test018 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test027.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test010"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test010"; 
			}
	}
})
