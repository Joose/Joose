if (typeof StressTest.Test030 == 'function' && StressTest.Test030.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test030";
}

Class('StressTest.Test030', {
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test047',
	       'StressTest.Test064',
	       'StressTest.Test080',
	       'StressTest.Test086',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 30 }
	},
	
	body : function(){
			if (!StressTest.Test032.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test030"; 
			}
	}
})
