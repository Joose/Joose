if (typeof StressTest.Test078 == 'function' && StressTest.Test078.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test078";
}

Class('StressTest.Test078', {
	use : [ 
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 78 }
	}
})
