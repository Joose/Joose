if (typeof StressTest.Test094 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test094";
}
//if (typeof StressTest.Test094 == 'function') throw "Double declaration of StressTest.Test094";

Class('StressTest.Test094', {
	use : [ 
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 94 }
	}
})
