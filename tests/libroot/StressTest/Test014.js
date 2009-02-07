if (typeof StressTest.Test014 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test014";
}
//if (typeof StressTest.Test014 == 'function') throw "Double declaration of StressTest.Test014";

Class('StressTest.Test014', {
	use : [ 
	   
	       'StressTest.Test018',
	   
	       'StressTest.Test026',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 14 }
	}
})
