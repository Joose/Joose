if (typeof StressTest.Test035 == 'function' && StressTest.Test035.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test035";
}

Class('StressTest.Test035', {
	use : [ 
	       'StressTest.Test036',
	       'StressTest.Test042',
	       'StressTest.Test058',
	       'StressTest.Test064',
	       'StressTest.Test096',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 35 }
	},
	
	body : function(){
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test035"; 
			}
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test035"; 
			}
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test035"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test035"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test035"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test035"; 
			}
	}
})
