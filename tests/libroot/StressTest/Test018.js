if (typeof StressTest.Test018 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test018";
}
//if (typeof StressTest.Test018 == 'function') throw "Double declaration of StressTest.Test018";

Class('StressTest.Test018', {
	use : [ 
	   
	       'StressTest.Test023',
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test037',
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test042',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 18 }
	}
})
