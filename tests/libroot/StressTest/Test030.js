if (typeof StressTest.Test030 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test030";
}
//if (typeof StressTest.Test030 == 'function') throw "Double declaration of StressTest.Test030";

Class('StressTest.Test030', {
	use : [ 
	   
	       'StressTest.Test042',
	   
	       'StressTest.Test045',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 30 }
	}
})
