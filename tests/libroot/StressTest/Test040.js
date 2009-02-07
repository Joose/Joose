if (typeof StressTest.Test040 == 'function' && StressTest.Test040.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test040";
}

Class('StressTest.Test040', {
	use : [ 
	       'StressTest.Test046',
	       'StressTest.Test056',
	       'StressTest.Test073',
	       'StressTest.Test078',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 40 }
	},
	
	body : function(){
			if (!StressTest.Test046.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test046 is not satisfied for class StressTest.Test040"; }
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test040"; }
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test040"; }
			if (!StressTest.Test078.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test078 is not satisfied for class StressTest.Test040"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test040"; }
	}
})
