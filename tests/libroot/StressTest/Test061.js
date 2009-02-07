if (typeof StressTest.Test061 == 'function' && StressTest.Test061.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test061";
}

Class('StressTest.Test061', {
	use : [ 
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 61 }
	}
})
