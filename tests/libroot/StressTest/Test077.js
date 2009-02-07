if (typeof StressTest.Test077 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test077";
}
//if (typeof StressTest.Test077 == 'function') throw "Double declaration of StressTest.Test077";

Class('StressTest.Test077', {
	use : [ 
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 77 }
	}
})
