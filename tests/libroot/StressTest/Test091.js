if (typeof StressTest.Test091 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test091";
}
//if (typeof StressTest.Test091 == 'function') throw "Double declaration of StressTest.Test091";

Class('StressTest.Test091', {
	use : [ 
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 91 }
	}
})
