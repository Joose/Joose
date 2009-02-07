if (typeof StressTest.Test049 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test049";
}
//if (typeof StressTest.Test049 == 'function') throw "Double declaration of StressTest.Test049";

Class('StressTest.Test049', {
	use : [ 
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 49 }
	}
})
