if (typeof StressTest.Test052 == 'function' && StressTest.Test052.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test052";
}

Class('StressTest.Test052', {
	use : [ 
	       'StressTest.Test053',
	       'StressTest.Test056',
	       'StressTest.Test059',
	       'StressTest.Test062',
	       'StressTest.Test066',
	       'StressTest.Test075',
	       'StressTest.Test076',
	       'StressTest.Test090',
	       'StressTest.Test091',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 52 }
	},
	
	body : function(){
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test062.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test062 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test090.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test090 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test052"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test052"; }
	}
})
