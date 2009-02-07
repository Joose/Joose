if (typeof StressTest.Test026 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test026";
}
//if (typeof StressTest.Test026 == 'function') throw "Double declaration of StressTest.Test026";

Class('StressTest.Test026', {
	use : [ 
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test043',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test089'
	   
	],
	
	methods : {
		result : function () { return 26 }
	}
})
