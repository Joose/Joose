if (typeof StressTest.Test003 == 'function' && StressTest.Test003.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test003";
}

Class('StressTest.Test003', {
	use : [ 
	       'StressTest.Test007',
	       'StressTest.Test013',
	       'StressTest.Test031',
	       'StressTest.Test044',
	       'StressTest.Test046',
	       'StressTest.Test048',
	       'StressTest.Test071',
	       'StressTest.Test074',
	       'StressTest.Test082',
	       'StressTest.Test085',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 3 }
	},
	
	body : function(){
			if (!StressTest.Test007.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test007 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test013.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test013 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test003"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test003"; 
			}
	}
})
