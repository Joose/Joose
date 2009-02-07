if (typeof StressTest.Test074 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test074";
}
//if (typeof StressTest.Test074 == 'function') throw "Double declaration of StressTest.Test074";

Class('StressTest.Test074', {
	use : [ 
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 74 }
	}
})
