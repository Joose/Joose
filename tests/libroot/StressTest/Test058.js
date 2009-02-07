if (typeof StressTest.Test058 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test058";
}
//if (typeof StressTest.Test058 == 'function') throw "Double declaration of StressTest.Test058";

Class('StressTest.Test058', {
	use : [ 
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test095'
	   
	],
	
	methods : {
		result : function () { return 58 }
	}
})
