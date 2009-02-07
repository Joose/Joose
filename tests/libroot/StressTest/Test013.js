if (typeof StressTest.Test013 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test013";
}
//if (typeof StressTest.Test013 == 'function') throw "Double declaration of StressTest.Test013";

Class('StressTest.Test013', {
	use : [ 
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 13 }
	}
})
