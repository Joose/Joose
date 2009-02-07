if (typeof StressTest.Test056 == 'function' && StressTest.Test056.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test056";
}

Class('StressTest.Test056', {
	use : [ 
	       'StressTest.Test061',
	       'StressTest.Test065',
	       'StressTest.Test070',
	       'StressTest.Test074',
	       'StressTest.Test088',
	       'StressTest.Test090',
	       'StressTest.Test092'
	],
	
	methods : {
		result : function () { return 56 }
	},
	
	body : function(){
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test056"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test056"; 
			}
	}
})
