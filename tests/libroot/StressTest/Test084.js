if (typeof StressTest.Test084 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test084";
}
//if (typeof StressTest.Test084 == 'function') throw "Double declaration of StressTest.Test084";

Class('StressTest.Test084', {
	use : [ 
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 84 }
	}
})
