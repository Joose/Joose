if (typeof StressTest.Test081 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test081";
}
//if (typeof StressTest.Test081 == 'function') throw "Double declaration of StressTest.Test081";

Class('StressTest.Test081', {
	use : [ 
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 81 }
	}
})
