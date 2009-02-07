if (typeof StressTest.Test012 == 'function' && StressTest.Test012.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test012";
}

Class('StressTest.Test012', {
	use : [ 
	       'StressTest.Test025',
	       'StressTest.Test031',
	       'StressTest.Test033',
	       'StressTest.Test034',
	       'StressTest.Test042',
	       'StressTest.Test054',
	       'StressTest.Test055',
	       'StressTest.Test057',
	       'StressTest.Test063',
	       'StressTest.Test080',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 12 }
	},
	
	body : function(){
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test012"; 
			}
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { 
				StressTest.unSatisfiedDeps = true;
				throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test012"; 
			}
	}
})
