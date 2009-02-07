if (typeof StressTest.Test045 == 'function' && StressTest.Test045.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test045";
}

Class('StressTest.Test045', {
	use : [ 
	       'StressTest.Test061',
	       'StressTest.Test069',
	       'StressTest.Test070',
	       'StressTest.Test082',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 45 }
	},
	
	body : function(){
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test045"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test045"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test045"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test045"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test045"; 
			}
	}
})
