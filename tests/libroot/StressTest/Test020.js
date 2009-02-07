if (typeof StressTest.Test020 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test020";
}
//if (typeof StressTest.Test020 == 'function') throw "Double declaration of StressTest.Test020";

Class('StressTest.Test020', {
	use : [ 
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test037',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 20 }
	}
})
