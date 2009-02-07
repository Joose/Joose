if (typeof StressTest.Test099 == 'function' && StressTest.Test099.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test099";
}

Class('StressTest.Test099', {
	use : [ 
	       'StressTest.Test100'
	],
	
	methods : {
		result : function () { return 99 }
	},
	
	body : function(){
			if (!StressTest.Test100.meta.meta.isa(Joose.Class)) { throw "Dependency StressTest.Test100 is not satisfied for class StressTest.Test099"; }
	}
})
