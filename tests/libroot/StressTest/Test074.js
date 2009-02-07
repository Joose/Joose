if (typeof StressTest.Test074 == 'function' && StressTest.Test074.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test074";
}

Class('StressTest.Test074', {
	use : [ 
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 74 }
	}
})
