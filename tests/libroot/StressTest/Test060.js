if (typeof StressTest.Test060 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test060";
}
//if (typeof StressTest.Test060 == 'function') throw "Double declaration of StressTest.Test060";

Class('StressTest.Test060', {
	use : [ 
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 60 }
	}
})
