if (typeof StressTest.Test075 == 'function' && StressTest.Test075.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test075";
}

Class('StressTest.Test075', {
	use : [ 
	       'StressTest.Test076',
	       'StressTest.Test077',
	       'StressTest.Test079',
	       'StressTest.Test083',
	       'StressTest.Test085',
	       'StressTest.Test087',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test096',
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 75 }
	},
	
	body : function(){
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test077.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test077 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test079.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test079 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test087.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test087 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test075"; }
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test075"; }
	}
})
