if (typeof StressTest.Test038 == 'function' && StressTest.Test038.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test038";
}

Class('StressTest.Test038', {
	use : [ 
	       'StressTest.Test040',
	       'StressTest.Test041',
	       'StressTest.Test043',
	       'StressTest.Test053',
	       'StressTest.Test056',
	       'StressTest.Test058',
	       'StressTest.Test062',
	       'StressTest.Test063',
	       'StressTest.Test065',
	       'StressTest.Test078',
	       'StressTest.Test084',
	       'StressTest.Test091',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 38 }
	},
	
	body : function(){
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test038"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test038"; 
			}
	}
})
