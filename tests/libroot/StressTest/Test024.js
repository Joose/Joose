if (typeof StressTest.Test024 == 'function' && StressTest.Test024.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test024";
}

Class('StressTest.Test024', {
	use : [ 
	       'StressTest.Test026',
	       'StressTest.Test027',
	       'StressTest.Test031',
	       'StressTest.Test038',
	       'StressTest.Test041',
	       'StressTest.Test048',
	       'StressTest.Test053',
	       'StressTest.Test064',
	       'StressTest.Test068',
	       'StressTest.Test083'
	],
	
	methods : {
		result : function () { return 24 }
	},
	
	body : function(){
			if (!StressTest.Test026.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test026 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test027.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test027 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test048.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test048 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test024"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test024"; }
	}
})
