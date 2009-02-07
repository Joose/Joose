if (typeof StressTest.Test097 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test097";
}
//if (typeof StressTest.Test097 == 'function') throw "Double declaration of StressTest.Test097";

Class('StressTest.Test097', {
	use : [ 
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 97 }
	}
})
