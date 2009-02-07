if (typeof StressTest.Test001 == 'function' && StressTest.Test001.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test001";
}

Class('StressTest.Test001', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test005',
	       'StressTest.Test006',
	       'StressTest.Test008',
	       'StressTest.Test011',
	       'StressTest.Test057',
	       'StressTest.Test069',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 1 }
	},
	
	body : function(){
			if (!StressTest.Test005.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test005 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test006.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test006 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test008.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test008 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test011.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test011 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test001"; 
			}
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test001"; 
			}
	}
})
