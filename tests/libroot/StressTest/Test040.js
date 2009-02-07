if (typeof StressTest.Test040 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test040";
}
//if (typeof StressTest.Test040 == 'function') throw "Double declaration of StressTest.Test040";

Class('StressTest.Test040', {
	use : [ 
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095'
	   
	],
	
	methods : {
		result : function () { return 40 }
	}
})
