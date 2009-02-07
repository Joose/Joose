if (typeof StressTest.Test005 == 'function' && StressTest.Test005.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test005";
}

Class('StressTest.Test005', {
	use : [ 
	       'StressTest.Test018',
	       'StressTest.Test034',
	       'StressTest.Test039',
	       'StressTest.Test050',
	       'StressTest.Test054',
	       'StressTest.Test057',
	       'StressTest.Test070',
	       'StressTest.Test083',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 5 }
	},
	
	body : function(){
			if (!StressTest.Test018.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test018 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test034.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test034 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test039.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test039 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test070.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test070 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test005"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test005"; }
	}
})
