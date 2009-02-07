if (typeof StressTest.Test077 == 'function' && StressTest.Test077.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test077";
}

Class('StressTest.Test077', {
	use : [ 
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 77 }
	}
})
