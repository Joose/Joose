if (typeof StressTest.Test028 == 'function' && StressTest.Test028.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test028";
}

Class('StressTest.Test028', {
	use : [ 
	       'StressTest.Test050',
	       'StressTest.Test066',
	       'StressTest.Test067',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 28 }
	},
	
	body : function(){
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test028"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test028"; }
			if (!StressTest.Test067.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test067 is not satisfied for class StressTest.Test028"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test028"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test028"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test028"; }
	}
})
