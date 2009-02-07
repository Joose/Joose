if (typeof StressTest.Test042 == 'function' && StressTest.Test042.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test042";
}

Class('StressTest.Test042', {
	use : [ 
	   
	       'StressTest.Test045',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 42 }
	}
})
