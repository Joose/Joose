if (typeof StressTest.Test036 == 'function' && StressTest.Test036.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test036";
}

Class('StressTest.Test036', {
	use : [ 
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 36 }
	}
})
