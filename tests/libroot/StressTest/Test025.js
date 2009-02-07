if (typeof StressTest.Test025 == 'function' && StressTest.Test025.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test025";
}

Class('StressTest.Test025', {
	use : [ 
	       'StressTest.Test037',
	       'StressTest.Test040',
	       'StressTest.Test049',
	       'StressTest.Test058',
	       'StressTest.Test060',
	       'StressTest.Test076',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test087'
	],
	
	methods : {
		result : function () { return 25 }
	},
	
	body : function(){
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test040.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test040 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test049.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test049 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test025"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test025"; }
	}
})
