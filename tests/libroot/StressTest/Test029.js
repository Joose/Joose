if (typeof StressTest.Test029 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test029";
}
//if (typeof StressTest.Test029 == 'function') throw "Double declaration of StressTest.Test029";

Class('StressTest.Test029', {
	use : [ 
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test043',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test090'
	   
	],
	
	methods : {
		result : function () { return 29 }
	}
})
