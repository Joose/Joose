if (typeof StressTest.Test053 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test053";
}
//if (typeof StressTest.Test053 == 'function') throw "Double declaration of StressTest.Test053";

Class('StressTest.Test053', {
	use : [ 
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 53 }
	}
})
