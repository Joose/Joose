if (typeof StressTest.Test089 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test089";
}
//if (typeof StressTest.Test089 == 'function') throw "Double declaration of StressTest.Test089";

Class('StressTest.Test089', {
	use : [ 
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 89 }
	}
})
