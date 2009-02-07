if (typeof StressTest.Test036 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test036";
}
//if (typeof StressTest.Test036 == 'function') throw "Double declaration of StressTest.Test036";

Class('StressTest.Test036', {
	use : [ 
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 36 }
	}
})
