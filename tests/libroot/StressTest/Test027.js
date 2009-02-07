if (typeof StressTest.Test027 == 'function' && StressTest.Test027.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test027";
}

Class('StressTest.Test027', {
	use : [ 
	   
	       'StressTest.Test038',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 27 }
	}
})
