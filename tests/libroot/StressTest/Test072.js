if (typeof StressTest.Test072 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test072";
}
//if (typeof StressTest.Test072 == 'function') throw "Double declaration of StressTest.Test072";

Class('StressTest.Test072', {
	use : [ 
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092'
	   
	],
	
	methods : {
		result : function () { return 72 }
	}
})
