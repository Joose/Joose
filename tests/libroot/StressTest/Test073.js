if (typeof StressTest.Test073 == 'function' && StressTest.Test073.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test073";
}

Class('StressTest.Test073', {
	use : [ 
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 73 }
	}
})
