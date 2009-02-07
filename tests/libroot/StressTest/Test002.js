if (typeof StressTest.Test002 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test002";
}
//if (typeof StressTest.Test002 == 'function') throw "Double declaration of StressTest.Test002";

Class('StressTest.Test002', {
	use : [ 
	   
	       'StressTest.Test025',
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 2 }
	}
})
