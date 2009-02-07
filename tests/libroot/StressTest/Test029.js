if (typeof StressTest.Test029 == 'function' && StressTest.Test029.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test029";
}

Class('StressTest.Test029', {
	use : [ 
	       'StressTest.Test032',
	       'StressTest.Test055',
	       'StressTest.Test064',
	       'StressTest.Test065',
	       'StressTest.Test077',
	       'StressTest.Test094',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 29 }
	},
	
	body : function(){
			if (!StressTest.Test032.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test032 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test029"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test029"; 
			}
	}
})
