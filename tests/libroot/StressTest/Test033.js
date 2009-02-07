if (typeof StressTest.Test033 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test033";
}
//if (typeof StressTest.Test033 == 'function') throw "Double declaration of StressTest.Test033";

Class('StressTest.Test033', {
	use : [ 
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 33 }
	}
})
