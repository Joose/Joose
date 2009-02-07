if (typeof StressTest.Test019 == 'function' && StressTest.Test019.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test019";
}

Class('StressTest.Test019', {
	use : [ 
	       'StressTest.Test021',
	       'StressTest.Test033',
	       'StressTest.Test034',
	       'StressTest.Test036',
	       'StressTest.Test045',
	       'StressTest.Test052',
	       'StressTest.Test058',
	       'StressTest.Test062',
	       'StressTest.Test081',
	       'StressTest.Test092',
	       'StressTest.Test093'
	],
	
	methods : {
		result : function () { return 19 }
	},
	
	body : function(){
			if (!StressTest.Test021.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test019"; 
			}
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test019"; 
			}
	}
})
