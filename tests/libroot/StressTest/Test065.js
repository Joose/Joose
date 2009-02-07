if (typeof StressTest.Test065 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test065";
}
//if (typeof StressTest.Test065 == 'function') throw "Double declaration of StressTest.Test065";

Class('StressTest.Test065', {
	use : [ 
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 65 }
	}
})
