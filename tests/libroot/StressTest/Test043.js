if (typeof StressTest.Test043 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test043";
}
//if (typeof StressTest.Test043 == 'function') throw "Double declaration of StressTest.Test043";

Class('StressTest.Test043', {
	use : [ 
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test090'
	   
	],
	
	methods : {
		result : function () { return 43 }
	}
})
