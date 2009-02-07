if (typeof StressTest.Test027 == 'function' && StressTest.Test027.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test027";
}

Class('StressTest.Test027', {
	use : [ 
	       'StressTest.Test029',
	       'StressTest.Test033',
	       'StressTest.Test034',
	       'StressTest.Test036',
	       'StressTest.Test046',
	       'StressTest.Test048',
	       'StressTest.Test057',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test089'
	],
	
	methods : {
		result : function () { return 27 }
	},
	
	body : function(){
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test027"; 
			}
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test027"; 
			}
	}
})
