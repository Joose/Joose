if (typeof StressTest.Test100 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test100";
}
//if (typeof StressTest.Test100 == 'function') throw "Double declaration of StressTest.Test100";

Class('StressTest.Test100', {
	use : [ 
	   
	],
	
	methods : {
		result : function () { return 100 }
	}
})
