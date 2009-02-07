if (typeof StressTest.Test037 == 'function' && StressTest.Test037.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test037";
}

Class('StressTest.Test037', {
	use : [ 
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 37 }
	}
})
