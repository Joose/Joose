if (typeof StressTest.Test037 == 'function' && StressTest.Test037.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test037";
}

Class('StressTest.Test037', {
	use : [ 
	       'StressTest.Test047',
	       'StressTest.Test051',
	       'StressTest.Test056',
	       'StressTest.Test065',
	       'StressTest.Test076',
	       'StressTest.Test080',
	       'StressTest.Test081',
	       'StressTest.Test099'
	],
	
	methods : {
		result : function () { return 37 }
	},
	
	body : function(){
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test065.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test065 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test081.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test081 is not satisfied for class StressTest.Test037"; }
			if (!StressTest.Test099.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test099 is not satisfied for class StressTest.Test037"; }
	}
})
