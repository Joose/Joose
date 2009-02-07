if (typeof StressTest.Test049 == 'function' && StressTest.Test049.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test049";
}

Class('StressTest.Test049', {
	use : [ 
	       'StressTest.Test058',
	       'StressTest.Test059',
	       'StressTest.Test060',
	       'StressTest.Test068',
	       'StressTest.Test071',
	       'StressTest.Test072',
	       'StressTest.Test073',
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test087',
	       'StressTest.Test091'
	],
	
	methods : {
		result : function () { return 49 }
	},
	
	body : function(){
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test060.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test060 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test068.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test068 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test071.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test071 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test073.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test073 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test049"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test049"; }
	}
})
