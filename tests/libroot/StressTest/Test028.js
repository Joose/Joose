if (typeof StressTest.Test028 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test028";
}
//if (typeof StressTest.Test028 == 'function') throw "Double declaration of StressTest.Test028";

Class('StressTest.Test028', {
	use : [ 
	   
	       'StressTest.Test035',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 28 }
	}
})
