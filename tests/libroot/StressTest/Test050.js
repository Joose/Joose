if (typeof StressTest.Test050 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test050";
}
//if (typeof StressTest.Test050 == 'function') throw "Double declaration of StressTest.Test050";

Class('StressTest.Test050', {
	use : [ 
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 50 }
	}
})
