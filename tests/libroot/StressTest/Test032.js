if (typeof StressTest.Test032 == 'function' && StressTest.Test032.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test032";
}

Class('StressTest.Test032', {
	use : [ 
	       'StressTest.Test035',
	       'StressTest.Test036',
	       'StressTest.Test040',
	       'StressTest.Test042',
	       'StressTest.Test043',
	       'StressTest.Test051',
	       'StressTest.Test052',
	       'StressTest.Test059',
	       'StressTest.Test062',
	       'StressTest.Test069',
	       'StressTest.Test091',
	       'StressTest.Test094',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 32 }
	},
	
	body : function(){
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test052.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test052 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test032"; 
			}
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test032"; 
			}
	}
})
