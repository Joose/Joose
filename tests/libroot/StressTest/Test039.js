if (typeof StressTest.Test039 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test039";
}
//if (typeof StressTest.Test039 == 'function') throw "Double declaration of StressTest.Test039";

Class('StressTest.Test039', {
	use : [ 
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 39 }
	}
})
