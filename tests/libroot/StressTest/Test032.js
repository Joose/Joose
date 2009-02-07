if (typeof StressTest.Test032 == 'function' && StressTest.Test032.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test032";
}

Class('StressTest.Test032', {
	use : [ 
	       'StressTest.Test033',
	       'StressTest.Test038',
	       'StressTest.Test039',
	       'StressTest.Test041',
	       'StressTest.Test045',
	       'StressTest.Test046',
	       'StressTest.Test063',
	       'StressTest.Test067',
	       'StressTest.Test070',
	       'StressTest.Test071',
	       'StressTest.Test076',
	       'StressTest.Test094',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 32 }
	},
	
	body : function(){
			if (!StressTest.Test033.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test033 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test038.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test038 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test041.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test041 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test045.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test045 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test063.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test063 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test032"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test032"; }
	}
})
