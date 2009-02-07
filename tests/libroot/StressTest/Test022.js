if (typeof StressTest.Test022 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test022";
}
//if (typeof StressTest.Test022 == 'function') throw "Double declaration of StressTest.Test022";

Class('StressTest.Test022', {
	use : [ 
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test045',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 22 }
	}
})
