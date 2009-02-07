if (typeof StressTest.Test034 == 'function' && StressTest.Test034.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test034";
}

Class('StressTest.Test034', {
	use : [ 
	       'StressTest.Test037',
	       'StressTest.Test042',
	       'StressTest.Test053',
	       'StressTest.Test056',
	       'StressTest.Test079',
	       'StressTest.Test080',
	       'StressTest.Test089',
	       'StressTest.Test091',
	       'StressTest.Test094',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 34 }
	},
	
	body : function(){
			if (!StressTest.Test037.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test037 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test042.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test042 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test091.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test091 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test034"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test034"; }
	}
})
