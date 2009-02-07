if (typeof StressTest.Test069 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test069";
}
//if (typeof StressTest.Test069 == 'function') throw "Double declaration of StressTest.Test069";

Class('StressTest.Test069', {
	use : [ 
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 69 }
	}
})
