if (typeof StressTest.Test061 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test061";
}
//if (typeof StressTest.Test061 == 'function') throw "Double declaration of StressTest.Test061";

Class('StressTest.Test061', {
	use : [ 
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 61 }
	}
})
