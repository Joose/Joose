if (typeof StressTest.Test027 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test027";
}
//if (typeof StressTest.Test027 == 'function') throw "Double declaration of StressTest.Test027";

Class('StressTest.Test027', {
	use : [ 
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test041',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 27 }
	}
})
