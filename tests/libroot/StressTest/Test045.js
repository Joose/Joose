if (typeof StressTest.Test045 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test045";
}
//if (typeof StressTest.Test045 == 'function') throw "Double declaration of StressTest.Test045";

Class('StressTest.Test045', {
	use : [ 
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test090'
	   
	],
	
	methods : {
		result : function () { return 45 }
	}
})
