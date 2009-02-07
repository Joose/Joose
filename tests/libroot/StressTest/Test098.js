if (typeof StressTest.Test098 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test098";
}
//if (typeof StressTest.Test098 == 'function') throw "Double declaration of StressTest.Test098";

Class('StressTest.Test098', {
	use : [ 
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 98 }
	}
})
