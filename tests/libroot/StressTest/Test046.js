if (typeof StressTest.Test046 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test046";
}
//if (typeof StressTest.Test046 == 'function') throw "Double declaration of StressTest.Test046";

Class('StressTest.Test046', {
	use : [ 
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 46 }
	}
})
