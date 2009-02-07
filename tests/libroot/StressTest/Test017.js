if (typeof StressTest.Test017 == 'function' && StressTest.Test017.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test017";
}

Class('StressTest.Test017', {
	use : [ 
	       'StressTest.Test023',
	       'StressTest.Test025',
	       'StressTest.Test038',
	       'StressTest.Test047',
	       'StressTest.Test052',
	       'StressTest.Test058',
	       'StressTest.Test068',
	       'StressTest.Test070',
	       'StressTest.Test075',
	       'StressTest.Test080',
	       'StressTest.Test082',
	       'StressTest.Test086',
	       'StressTest.Test090'
	],
	
	methods : {
		result : function () { return 17 }
	},
	
	body : function(){
			if (!StressTest.Test023.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test023 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test017"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test017"; 
			}
	}
})
