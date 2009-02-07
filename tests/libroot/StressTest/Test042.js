if (typeof StressTest.Test042 == 'function' && StressTest.Test042.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test042";
}

Class('StressTest.Test042', {
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test047',
	       'StressTest.Test049',
	       'StressTest.Test053',
	       'StressTest.Test056',
	       'StressTest.Test060',
	       'StressTest.Test064',
	       'StressTest.Test070',
	       'StressTest.Test095',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 42 }
	},
	
	body : function(){
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test047.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test047 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test042"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test042"; }
	}
})
