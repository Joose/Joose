if (typeof StressTest.Test057 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test057";
}
//if (typeof StressTest.Test057 == 'function') throw "Double declaration of StressTest.Test057";

Class('StressTest.Test057', {
	use : [ 
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 57 }
	}
})
