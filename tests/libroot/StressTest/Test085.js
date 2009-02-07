if (typeof StressTest.Test085 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test085";
}
//if (typeof StressTest.Test085 == 'function') throw "Double declaration of StressTest.Test085";

Class('StressTest.Test085', {
	use : [ 
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 85 }
	}
})
