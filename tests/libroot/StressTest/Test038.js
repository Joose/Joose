if (typeof StressTest.Test038 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test038";
}
//if (typeof StressTest.Test038 == 'function') throw "Double declaration of StressTest.Test038";

Class('StressTest.Test038', {
	use : [ 
	   
	       'StressTest.Test042',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 38 }
	}
})
