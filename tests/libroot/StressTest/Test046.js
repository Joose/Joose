if (typeof StressTest.Test046 == 'function' && StressTest.Test046.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test046";
}

Class('StressTest.Test046', {
	use : [ 
	       'StressTest.Test051',
	       'StressTest.Test053',
	       'StressTest.Test058',
	       'StressTest.Test074',
	       'StressTest.Test075',
	       'StressTest.Test077',
	       'StressTest.Test091',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 46 }
	},
	
	body : function(){
			if (!StressTest.Test051.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test051 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test046"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test046"; }
	}
})
