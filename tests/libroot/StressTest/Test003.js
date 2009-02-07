if (typeof StressTest.Test003 == 'function' && StressTest.Test003.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test003";
}

Class('StressTest.Test003', {
	use : [ 
	       'StressTest.Test029',
	       'StressTest.Test038',
	       'StressTest.Test042',
	       'StressTest.Test048',
	       'StressTest.Test049',
	       'StressTest.Test053',
	       'StressTest.Test054',
	       'StressTest.Test058',
	       'StressTest.Test062',
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test068',
	       'StressTest.Test082',
	       'StressTest.Test088'
	],
	
	methods : {
		result : function () { return 3 }
	},
	
	body : function(){
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test003"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test003"; }
	}
})
