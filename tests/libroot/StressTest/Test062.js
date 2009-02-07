if (typeof StressTest.Test062 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test062";
}
//if (typeof StressTest.Test062 == 'function') throw "Double declaration of StressTest.Test062";

Class('StressTest.Test062', {
	use : [ 
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089'
	   
	],
	
	methods : {
		result : function () { return 62 }
	}
})
