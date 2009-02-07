if (typeof StressTest.Test001 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test001";
}
//if (typeof StressTest.Test001 == 'function') throw "Double declaration of StressTest.Test001";

Class('StressTest.Test001', {
	use : [ 
	   
	       'StressTest.Test006',
	   
	       'StressTest.Test009',
	   
	       'StressTest.Test024',
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test038',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test042',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test062'
	   
	],
	
	methods : {
		result : function () { return 1 }
	}
})
