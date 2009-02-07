if (typeof StressTest.Test047 == 'function' && StressTest.Test047.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test047";
}

Class('StressTest.Test047', {
	use : [ 
	       'StressTest.Test049',
	       'StressTest.Test059',
	       'StressTest.Test060',
	       'StressTest.Test062',
	       'StressTest.Test066',
	       'StressTest.Test068',
	       'StressTest.Test073',
	       'StressTest.Test078',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test090',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 47 }
	},
	
	body : function(){
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test047"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test047"; 
			}
	}
})
