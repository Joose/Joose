if (typeof StressTest.Test059 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test059";
}
//if (typeof StressTest.Test059 == 'function') throw "Double declaration of StressTest.Test059";

Class('StressTest.Test059', {
	use : [ 
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 59 }
	}
})
