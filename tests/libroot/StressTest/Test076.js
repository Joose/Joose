if (typeof StressTest.Test076 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test076";
}
//if (typeof StressTest.Test076 == 'function') throw "Double declaration of StressTest.Test076";

Class('StressTest.Test076', {
	use : [ 
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 76 }
	}
})
