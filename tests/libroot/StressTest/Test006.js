if (typeof StressTest.Test006 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test006";
}
//if (typeof StressTest.Test006 == 'function') throw "Double declaration of StressTest.Test006";

Class('StressTest.Test006', {
	use : [ 
	   
	       'StressTest.Test007',
	   
	       'StressTest.Test013',
	   
	       'StressTest.Test025',
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 6 }
	}
})
