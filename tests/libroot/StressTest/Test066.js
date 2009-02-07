if (typeof StressTest.Test066 == 'function' && StressTest.Test066.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test066";
}

Class('StressTest.Test066', {
	use : [ 
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 66 }
	}
})
