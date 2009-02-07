if (typeof StressTest.Test021 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test021";
}
//if (typeof StressTest.Test021 == 'function') throw "Double declaration of StressTest.Test021";

Class('StressTest.Test021', {
	use : [ 
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 21 }
	}
})
