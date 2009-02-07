if (typeof StressTest.Test029 == 'function' && StressTest.Test029.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test029";
}

Class('StressTest.Test029', {
	use : [ 
	       'StressTest.Test033',
	       'StressTest.Test046',
	       'StressTest.Test053',
	       'StressTest.Test054',
	       'StressTest.Test057',
	       'StressTest.Test059',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test069',
	       'StressTest.Test073',
	       'StressTest.Test078',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 29 }
	},
	
	body : function(){
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test069.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test069 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test029"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test029"; }
	}
})
