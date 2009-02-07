if (typeof StressTest.Test013 == 'function' && StressTest.Test013.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test013";
}

Class('StressTest.Test013', {
	use : [ 
	   
	       'StressTest.Test041',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 13 }
	}
})
