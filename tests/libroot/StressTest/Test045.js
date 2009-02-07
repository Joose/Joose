if (typeof StressTest.Test045 == 'function' && StressTest.Test045.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test045";
}

Class('StressTest.Test045', {
	use : [ 
	       'StressTest.Test050',
	       'StressTest.Test053',
	       'StressTest.Test054',
	       'StressTest.Test055',
	       'StressTest.Test059',
	       'StressTest.Test074',
	       'StressTest.Test076',
	       'StressTest.Test080',
	       'StressTest.Test084',
	       'StressTest.Test092',
	       'StressTest.Test093',
	       'StressTest.Test095',
	       'StressTest.Test096'
	],
	
	methods : {
		result : function () { return 45 }
	},
	
	body : function(){
			if (!StressTest.Test050.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test050 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test053.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test053 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test059.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test059 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test074.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test074 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test080.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test080 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test093.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test093 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test045"; }
			if (!StressTest.Test096.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test096 is not satisfied for class StressTest.Test045"; }
	}
})
