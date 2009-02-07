if (typeof StressTest.Test079 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test079";
}
//if (typeof StressTest.Test079 == 'function') throw "Double declaration of StressTest.Test079";

Class('StressTest.Test079', {
	use : [ 
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092'
	   
	],
	
	methods : {
		result : function () { return 79 }
	}
})
