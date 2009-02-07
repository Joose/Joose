if (typeof StressTest.Test002 == 'function' && StressTest.Test002.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test002";
}

Class('StressTest.Test002', {
	use : [ 
	       'StressTest.Test013',
	       'StressTest.Test028',
	       'StressTest.Test029',
	       'StressTest.Test039',
	       'StressTest.Test041',
	       'StressTest.Test055',
	       'StressTest.Test056',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test067',
	       'StressTest.Test074'
	],
	
	methods : {
		result : function () { return 2 }
	},
	
	body : function(){
			if (!StressTest.Test013.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test002"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test002"; 
			}
	}
})
