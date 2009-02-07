if (typeof StressTest.Test086 == 'function' && StressTest.Test086.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test086";
}

Class('StressTest.Test086', {
	use : [ 
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 86 }
	}
})
