if (typeof StressTest.Test085 == 'function' && StressTest.Test085.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test085";
}

Class('StressTest.Test085', {
	use : [ 
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 85 }
	}
})
