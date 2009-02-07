if (typeof StressTest.Test031 == 'function' && StressTest.Test031.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test031";
}

Class('StressTest.Test031', {
	use : [ 
	       'StressTest.Test044',
	       'StressTest.Test054',
	       'StressTest.Test055',
	       'StressTest.Test072',
	       'StressTest.Test076',
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test086',
	       'StressTest.Test088',
	       'StressTest.Test095'
	],
	
	methods : {
		result : function () { return 31 }
	},
	
	body : function(){
			if (!StressTest.Test044.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test044 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test055.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test055 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test072.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test072 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test076.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test076 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test031"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test031"; }
	}
})
