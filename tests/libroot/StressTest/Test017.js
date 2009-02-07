if (typeof StressTest.Test017 == 'function' && StressTest.Test017.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test017";
}

Class('StressTest.Test017', {
	use : [ 
	       'StressTest.Test025',
	       'StressTest.Test028',
	       'StressTest.Test029',
	       'StressTest.Test031',
	       'StressTest.Test033',
	       'StressTest.Test034',
	       'StressTest.Test036',
	       'StressTest.Test069',
	       'StressTest.Test075',
	       'StressTest.Test079'
	],
	
	methods : {
		result : function () { return 17 }
	},
	
	body : function(){
			if (!StressTest.Test025.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test025 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test031.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test031 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test036.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test036 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test017"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test017"; }
	}
})
