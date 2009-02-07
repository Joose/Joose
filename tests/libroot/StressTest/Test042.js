if (typeof StressTest.Test042 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test042";
}
//if (typeof StressTest.Test042 == 'function') throw "Double declaration of StressTest.Test042";

Class('StressTest.Test042', {
	use : [ 
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test081'
	   
	],
	
	methods : {
		result : function () { return 42 }
	}
})
