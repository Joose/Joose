if (typeof StressTest.Test095 == 'function' && StressTest.Test095.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test095";
}

Class('StressTest.Test095', {
	use : [ 
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 95 }
	}
})
