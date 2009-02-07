if (typeof StressTest.Test095 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test095";
}
//if (typeof StressTest.Test095 == 'function') throw "Double declaration of StressTest.Test095";

Class('StressTest.Test095', {
	use : [ 
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 95 }
	}
})
