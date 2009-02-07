if (typeof StressTest.Test018 == 'function' && StressTest.Test018.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test018";
}

Class('StressTest.Test018', {
	use : [ 
	       'StressTest.Test025',
	       'StressTest.Test061',
	       'StressTest.Test079',
	       'StressTest.Test086'
	],
	
	methods : {
		result : function () { return 18 }
	},
	
	body : function(){
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test018"; 
			}
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test018"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test018"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test018"; 
			}
	}
})
