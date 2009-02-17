
try {
	if (typeof StressTest.Test020 == 'function' && StressTest.Test020.meta.meta.isa(Joose.Class)) {
		StressTest.doubleDeclarations = true;
		throw "Double declaration of StressTest.Test020";
	}
} catch (e) {
	
}

Class('StressTest.Test020', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test027',
	       'StressTest.Test034',
	       'StressTest.Test037',
	       'StressTest.Test043',
	       'StressTest.Test045',
	       'StressTest.Test048',
	       'StressTest.Test060',
	       'StressTest.Test085',
	       'StressTest.Test089',
	       'StressTest.Test094'
	],
	
	methods : {
		result : function () { return 20 }
	},
	
	body : function(){
			if (!StressTest.Test027.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test020"; 
			}
	}
})
