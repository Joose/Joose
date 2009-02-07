if (typeof StressTest.Test016 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test016";
}
//if (typeof StressTest.Test016 == 'function') throw "Double declaration of StressTest.Test016";

Class('StressTest.Test016', {
	use : [ 
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test022',
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 16 }
	}
})
