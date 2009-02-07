if (typeof StressTest.Test087 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test087";
}
//if (typeof StressTest.Test087 == 'function') throw "Double declaration of StressTest.Test087";

Class('StressTest.Test087', {
	use : [ 
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 87 }
	}
})
