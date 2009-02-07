if (typeof StressTest.Test017 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test017";
}
//if (typeof StressTest.Test017 == 'function') throw "Double declaration of StressTest.Test017";

Class('StressTest.Test017', {
	use : [ 
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test035',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 17 }
	}
})
