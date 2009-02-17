
try {
	if (typeof StressTest.Test030 == 'function' && StressTest.Test030.meta.meta.isa(Joose.Class)) {
		StressTest.doubleDeclarations = true;
		throw "Double declaration of StressTest.Test030";
	}
} catch (e) {
	
}

Class('StressTest.Test030', {
	version : 0.1,
	
	use : [ 
	       'StressTest.Test039',
	       'StressTest.Test043',
	       'StressTest.Test049',
	       'StressTest.Test053',
	       'StressTest.Test061',
	       'StressTest.Test063',
	       'StressTest.Test081',
	       'StressTest.Test082',
	       'StressTest.Test087'
	],
	
	methods : {
		result : function () { return 30 }
	},
	
	body : function(){
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test043.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test043 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test030"; 
			}
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test030"; 
			}
	}
})
