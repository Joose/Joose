if (typeof StressTest.Test083 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test083";
}
//if (typeof StressTest.Test083 == 'function') throw "Double declaration of StressTest.Test083";

Class('StressTest.Test083', {
	use : [ 
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 83 }
	}
})
