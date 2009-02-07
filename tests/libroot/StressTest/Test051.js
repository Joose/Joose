if (typeof StressTest.Test051 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test051";
}
//if (typeof StressTest.Test051 == 'function') throw "Double declaration of StressTest.Test051";

Class('StressTest.Test051', {
	use : [ 
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 51 }
	}
})
