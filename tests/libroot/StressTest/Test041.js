if (typeof StressTest.Test041 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test041";
}
//if (typeof StressTest.Test041 == 'function') throw "Double declaration of StressTest.Test041";

Class('StressTest.Test041', {
	use : [ 
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 41 }
	}
})
