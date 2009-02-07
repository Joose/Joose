if (typeof StressTest.Test023 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test023";
}
//if (typeof StressTest.Test023 == 'function') throw "Double declaration of StressTest.Test023";

Class('StressTest.Test023', {
	use : [ 
	   
	       'StressTest.Test028',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 23 }
	}
})
