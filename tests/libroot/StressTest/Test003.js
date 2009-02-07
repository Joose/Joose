if (typeof StressTest.Test003 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test003";
}
//if (typeof StressTest.Test003 == 'function') throw "Double declaration of StressTest.Test003";

Class('StressTest.Test003', {
	use : [ 
	   
	       'StressTest.Test018',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 3 }
	}
})
