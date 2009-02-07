if (typeof StressTest.Test037 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test037";
}
//if (typeof StressTest.Test037 == 'function') throw "Double declaration of StressTest.Test037";

Class('StressTest.Test037', {
	use : [ 
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test041',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 37 }
	}
})
