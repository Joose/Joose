if (typeof StressTest.Test035 == 'function' && StressTest.Test035.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test035";
}

Class('StressTest.Test035', {
	use : [ 
	       'StressTest.Test046',
	       'StressTest.Test050',
	       'StressTest.Test051',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test068',
	       'StressTest.Test076',
	       'StressTest.Test082',
	       'StressTest.Test083',
	       'StressTest.Test092',
	       'StressTest.Test097',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 35 }
	},
	
	body : function(){
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test035"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test035"; }
	}
})
