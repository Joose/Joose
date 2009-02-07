if (typeof StressTest.Test071 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test071";
}
//if (typeof StressTest.Test071 == 'function') throw "Double declaration of StressTest.Test071";

Class('StressTest.Test071', {
	use : [ 
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 71 }
	}
})
