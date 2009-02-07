if (typeof StressTest.Test080 == 'function' && StressTest.Test080.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test080";
}

Class('StressTest.Test080', {
	use : [ 
	       'StressTest.Test082',
	       'StressTest.Test084',
	       'StressTest.Test085',
	       'StressTest.Test086',
	       'StressTest.Test088',
	       'StressTest.Test089',
	       'StressTest.Test092',
	       'StressTest.Test094',
	       'StressTest.Test095',
	       'StressTest.Test097'
	],
	
	methods : {
		result : function () { return 80 }
	},
	
	body : function(){
			if (!StressTest.Test082.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test082 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test084.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test084 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test085.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test085 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test088.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test088 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test092.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test092 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test095.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test095 is not satisfied for class StressTest.Test080"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test080"; }
	}
})
