if (typeof StressTest.Test080 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test080";
}
//if (typeof StressTest.Test080 == 'function') throw "Double declaration of StressTest.Test080";

Class('StressTest.Test080', {
	use : [ 
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 80 }
	}
})
