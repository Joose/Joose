if (typeof StressTest.Test056 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test056";
}
//if (typeof StressTest.Test056 == 'function') throw "Double declaration of StressTest.Test056";

Class('StressTest.Test056', {
	use : [ 
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test081'
	   
	],
	
	methods : {
		result : function () { return 56 }
	}
})
