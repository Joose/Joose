if (typeof StressTest.Test025 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test025";
}
//if (typeof StressTest.Test025 == 'function') throw "Double declaration of StressTest.Test025";

Class('StressTest.Test025', {
	use : [ 
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 25 }
	}
})
