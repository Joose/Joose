if (typeof StressTest.Test004 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test004";
}
//if (typeof StressTest.Test004 == 'function') throw "Double declaration of StressTest.Test004";

Class('StressTest.Test004', {
	use : [ 
	   
	       'StressTest.Test009',
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test023',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test075'
	   
	],
	
	methods : {
		result : function () { return 4 }
	}
})
