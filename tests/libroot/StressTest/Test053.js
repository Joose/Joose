if (typeof StressTest.Test053 == 'function' && StressTest.Test053.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test053";
}

Class('StressTest.Test053', {
	use : [ 
	       'StressTest.Test061',
	       'StressTest.Test066',
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test096',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 53 }
	},
	
	body : function(){
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test053"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test053"; 
			}
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test053"; 
			}
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test053"; 
			}
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test053"; 
			}
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test053"; 
			}
	}
})
