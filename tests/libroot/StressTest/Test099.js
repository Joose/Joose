if (typeof StressTest.Test099 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test099";
}
//if (typeof StressTest.Test099 == 'function') throw "Double declaration of StressTest.Test099";

Class('StressTest.Test099', {
	use : [ 
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 99 }
	}
})
