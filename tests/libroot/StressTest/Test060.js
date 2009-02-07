if (typeof StressTest.Test060 == 'function' && StressTest.Test060.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test060";
}

Class('StressTest.Test060', {
	use : [ 
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 60 }
	}
})
