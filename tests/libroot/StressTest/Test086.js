if (typeof StressTest.Test086 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test086";
}
//if (typeof StressTest.Test086 == 'function') throw "Double declaration of StressTest.Test086";

Class('StressTest.Test086', {
	use : [ 
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 86 }
	}
})
