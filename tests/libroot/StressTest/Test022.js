if (typeof StressTest.Test022 == 'function' && StressTest.Test022.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test022";
}

Class('StressTest.Test022', {
	use : [ 
	       'StressTest.Test042',
	       'StressTest.Test058',
	       'StressTest.Test074',
	       'StressTest.Test080',
	       'StressTest.Test085',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 22 }
	},
	
	body : function(){
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test022"; 
			}
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test022"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test022"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test022"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test022"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test022"; 
			}
	}
})
