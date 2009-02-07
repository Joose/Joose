if (typeof StressTest.Test078 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test078";
}
//if (typeof StressTest.Test078 == 'function') throw "Double declaration of StressTest.Test078";

Class('StressTest.Test078', {
	use : [ 
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 78 }
	}
})
