if (typeof StressTest.Test064 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test064";
}
//if (typeof StressTest.Test064 == 'function') throw "Double declaration of StressTest.Test064";

Class('StressTest.Test064', {
	use : [ 
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 64 }
	}
})
