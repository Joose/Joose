if (typeof StressTest.Test073 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test073";
}
//if (typeof StressTest.Test073 == 'function') throw "Double declaration of StressTest.Test073";

Class('StressTest.Test073', {
	use : [ 
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 73 }
	}
})
