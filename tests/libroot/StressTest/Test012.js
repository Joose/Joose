if (typeof StressTest.Test012 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test012";
}
//if (typeof StressTest.Test012 == 'function') throw "Double declaration of StressTest.Test012";

Class('StressTest.Test012', {
	use : [ 
	   
	       'StressTest.Test020',
	   
	       'StressTest.Test021',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 12 }
	}
})
