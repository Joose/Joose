if (typeof StressTest.Test009 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test009";
}
//if (typeof StressTest.Test009 == 'function') throw "Double declaration of StressTest.Test009";

Class('StressTest.Test009', {
	use : [ 
	   
	       'StressTest.Test010',
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 9 }
	}
})
