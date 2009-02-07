if (typeof StressTest.Test053 == 'function' && StressTest.Test053.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test053";
}

Class('StressTest.Test053', {
	use : [ 
	       'StressTest.Test056',
	       'StressTest.Test057',
	       'StressTest.Test058',
	       'StressTest.Test075',
	       'StressTest.Test086',
	       'StressTest.Test094',
	       'StressTest.Test097',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 53 }
	},
	
	body : function(){
			if (!StressTest.Test056.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test056 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test057.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test057 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test058.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test058 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test075.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test075 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test086.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test086 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test094.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test094 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test097.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test097 is not satisfied for class StressTest.Test053"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test053"; }
	}
})
