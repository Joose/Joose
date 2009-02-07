if (typeof StressTest.Test070 == 'function' && StressTest.Test070.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test070";
}

Class('StressTest.Test070', {
	use : [ 
	       'StressTest.Test072',
	       'StressTest.Test077',
	       'StressTest.Test083',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test089',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 70 }
	},
	
	body : function(){
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test070"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test070"; 
			}
	}
})
