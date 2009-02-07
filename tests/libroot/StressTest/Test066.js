if (typeof StressTest.Test066 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test066";
}
//if (typeof StressTest.Test066 == 'function') throw "Double declaration of StressTest.Test066";

Class('StressTest.Test066', {
	use : [ 
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test085'
	   
	],
	
	methods : {
		result : function () { return 66 }
	}
})
