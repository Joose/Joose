if (typeof StressTest.Test002 == 'function' && StressTest.Test002.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test002";
}

Class('StressTest.Test002', {
	use : [ 
	       'StressTest.Test019',
	       'StressTest.Test021',
	       'StressTest.Test050',
	       'StressTest.Test054',
	       'StressTest.Test058',
	       'StressTest.Test061',
	       'StressTest.Test072',
	       'StressTest.Test080',
	       'StressTest.Test083',
	       'StressTest.Test092',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 2 }
	},
	
	body : function(){
			if (!StressTest.Test019.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test019 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test021.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test021 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test061.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test061 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test083.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test083 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test002"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test002"; }
	}
})
