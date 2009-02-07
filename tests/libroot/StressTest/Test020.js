if (typeof StressTest.Test020 == 'function' && StressTest.Test020.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test020";
}

Class('StressTest.Test020', {
	use : [ 
	       'StressTest.Test028',
	       'StressTest.Test033',
	       'StressTest.Test043',
	       'StressTest.Test048',
	       'StressTest.Test060',
	       'StressTest.Test072',
	       'StressTest.Test075',
	       'StressTest.Test079',
	       'StressTest.Test082',
	       'StressTest.Test090',
	       'StressTest.Test094',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 20 }
	},
	
	body : function(){
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test020"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test020"; 
			}
	}
})
