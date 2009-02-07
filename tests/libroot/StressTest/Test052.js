if (typeof StressTest.Test052 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test052";
}
//if (typeof StressTest.Test052 == 'function') throw "Double declaration of StressTest.Test052";

Class('StressTest.Test052', {
	use : [ 
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 52 }
	}
})
