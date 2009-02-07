if (typeof StressTest.Test010 == 'function' && StressTest.Test010.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test010";
}

Class('StressTest.Test010', {
	use : [ 
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 10 }
	}
})
