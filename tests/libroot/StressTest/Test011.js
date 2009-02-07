if (typeof StressTest.Test011 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test011";
}
//if (typeof StressTest.Test011 == 'function') throw "Double declaration of StressTest.Test011";

Class('StressTest.Test011', {
	use : [ 
	   
	       'StressTest.Test019',
	   
	       'StressTest.Test021',
	   
	       'StressTest.Test025',
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 11 }
	}
})
