if (typeof StressTest.Test079 == 'function' && StressTest.Test079.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test079";
}

Class('StressTest.Test079', {
	use : [ 
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 79 }
	}
})
