if (typeof StressTest.Test058 == 'function' && StressTest.Test058.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test058";
}

Class('StressTest.Test058', {
	use : [ 
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 58 }
	}
})
