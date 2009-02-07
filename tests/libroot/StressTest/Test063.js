if (typeof StressTest.Test063 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test063";
}
//if (typeof StressTest.Test063 == 'function') throw "Double declaration of StressTest.Test063";

Class('StressTest.Test063', {
	use : [ 
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 63 }
	}
})
