if (typeof StressTest.Test088 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test088";
}
//if (typeof StressTest.Test088 == 'function') throw "Double declaration of StressTest.Test088";

Class('StressTest.Test088', {
	use : [ 
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 88 }
	}
})
