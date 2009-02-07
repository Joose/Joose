if (typeof StressTest.Test080 == 'function' && StressTest.Test080.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test080";
}

Class('StressTest.Test080', {
	use : [ 
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 80 }
	}
})
