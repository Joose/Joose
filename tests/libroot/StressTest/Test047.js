if (typeof StressTest.Test047 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test047";
}
//if (typeof StressTest.Test047 == 'function') throw "Double declaration of StressTest.Test047";

Class('StressTest.Test047', {
	use : [ 
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test092'
	   
	],
	
	methods : {
		result : function () { return 47 }
	}
})
