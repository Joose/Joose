if (typeof StressTest.Test015 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test015";
}
//if (typeof StressTest.Test015 == 'function') throw "Double declaration of StressTest.Test015";

Class('StressTest.Test015', {
	use : [ 
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test035',
	   
	       'StressTest.Test037',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 15 }
	}
})
