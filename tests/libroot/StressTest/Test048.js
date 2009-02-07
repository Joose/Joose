if (typeof StressTest.Test048 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test048";
}
//if (typeof StressTest.Test048 == 'function') throw "Double declaration of StressTest.Test048";

Class('StressTest.Test048', {
	use : [ 
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 48 }
	}
})
