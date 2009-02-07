if (typeof StressTest.Test022 == 'function' && StressTest.Test022.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test022";
}

Class('StressTest.Test022', {
	use : [ 
	       'StressTest.Test024',
	       'StressTest.Test029',
	       'StressTest.Test034',
	       'StressTest.Test050',
	       'StressTest.Test051',
	       'StressTest.Test053',
	       'StressTest.Test073',
	       'StressTest.Test094',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 22 }
	},
	
	body : function(){
			if (!StressTest.Test024.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test024 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test029.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test029 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test022"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test022"; }
	}
})
