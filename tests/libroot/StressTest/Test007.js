if (typeof StressTest.Test007 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test007";
}
//if (typeof StressTest.Test007 == 'function') throw "Double declaration of StressTest.Test007";

Class('StressTest.Test007', {
	use : [ 
	   
	       'StressTest.Test019',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test084'
	   
	],
	
	methods : {
		result : function () { return 7 }
	}
})
