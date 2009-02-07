if (typeof StressTest.Test035 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test035";
}
//if (typeof StressTest.Test035 == 'function') throw "Double declaration of StressTest.Test035";

Class('StressTest.Test035', {
	use : [ 
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test041',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 35 }
	}
})
