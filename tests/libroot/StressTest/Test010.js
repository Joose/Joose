if (typeof StressTest.Test010 == 'function' && StressTest.Test010.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test010";
}

Class('StressTest.Test010', {
	use : [ 
	       'StressTest.Test028',
	       'StressTest.Test035',
	       'StressTest.Test054',
	       'StressTest.Test064',
	       'StressTest.Test066',
	       'StressTest.Test089',
	       'StressTest.Test098'
	],
	
	methods : {
		result : function () { return 10 }
	},
	
	body : function(){
			if (!StressTest.Test028.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test028 is not satisfied for class StressTest.Test010"; }
			if (!StressTest.Test035.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test035 is not satisfied for class StressTest.Test010"; }
			if (!StressTest.Test054.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test054 is not satisfied for class StressTest.Test010"; }
			if (!StressTest.Test064.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test064 is not satisfied for class StressTest.Test010"; }
			if (!StressTest.Test066.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test066 is not satisfied for class StressTest.Test010"; }
			if (!StressTest.Test089.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test089 is not satisfied for class StressTest.Test010"; }
			if (!StressTest.Test098.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test098 is not satisfied for class StressTest.Test010"; }
	}
})
