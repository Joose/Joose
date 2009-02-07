if (typeof StressTest.Test005 == 'function' && StressTest.Test005.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test005";
}

Class('StressTest.Test005', {
	use : [ 
	       'StressTest.Test015',
	       'StressTest.Test025',
	       'StressTest.Test048',
	       'StressTest.Test051',
	       'StressTest.Test063',
	       'StressTest.Test067',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 5 }
	},
	
	body : function(){
			if (!StressTest.Test015.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test015 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test005"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test005"; 
			}
	}
})
