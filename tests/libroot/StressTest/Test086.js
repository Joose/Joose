if (typeof StressTest.Test086 == 'function' && StressTest.Test086.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test086";
}

Class('StressTest.Test086', {
	use : [ 
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test093',
	       'StressTest.Test094',
	       'StressTest.Test096',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 86 }
	},
	
	body : function(){
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test086"; 
			}
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test086"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test086"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test086"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test086"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test086"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test086"; 
			}
	}
})
