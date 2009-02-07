if (typeof StressTest.Test008 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test008";
}
//if (typeof StressTest.Test008 == 'function') throw "Double declaration of StressTest.Test008";

Class('StressTest.Test008', {
	use : [ 
	   
	       'StressTest.Test012',
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test025',
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test035',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test081'
	   
	],
	
	methods : {
		result : function () { return 8 }
	}
})
