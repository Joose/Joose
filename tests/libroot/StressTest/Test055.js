if (typeof StressTest.Test055 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test055";
}
//if (typeof StressTest.Test055 == 'function') throw "Double declaration of StressTest.Test055";

Class('StressTest.Test055', {
	use : [ 
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 55 }
	}
})
