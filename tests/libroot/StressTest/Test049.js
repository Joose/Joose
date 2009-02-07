if (typeof StressTest.Test049 == 'function' && StressTest.Test049.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test049";
}

Class('StressTest.Test049', {
	use : [ 
	       'StressTest.Test051',
	       'StressTest.Test066',
	       'StressTest.Test069',
	       'StressTest.Test077',
	       'StressTest.Test087'
	],
	
	methods : {
		result : function () { return 49 }
	},
	
	body : function(){
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test049"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test049"; 
			}
	}
})
