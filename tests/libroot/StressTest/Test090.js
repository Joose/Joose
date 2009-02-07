if (typeof StressTest.Test090 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test090";
}
//if (typeof StressTest.Test090 == 'function') throw "Double declaration of StressTest.Test090";

Class('StressTest.Test090', {
	use : [ 
	   
	       'StressTest.Test091',
	   
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
		result : function () { return 90 }
	}
})
