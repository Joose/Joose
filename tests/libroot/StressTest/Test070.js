if (typeof StressTest.Test070 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test070";
}
//if (typeof StressTest.Test070 == 'function') throw "Double declaration of StressTest.Test070";

Class('StressTest.Test070', {
	use : [ 
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 70 }
	}
})
