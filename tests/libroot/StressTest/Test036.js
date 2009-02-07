if (typeof StressTest.Test036 == 'function' && StressTest.Test036.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test036";
}

Class('StressTest.Test036', {
	use : [ 
	       'StressTest.Test045',
	       'StressTest.Test046',
	       'StressTest.Test051',
	       'StressTest.Test062',
	       'StressTest.Test068',
	       'StressTest.Test075',
	       'StressTest.Test091',
	       'StressTest.Test094',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 36 }
	},
	
	body : function(){
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test036"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test036"; 
			}
	}
})
