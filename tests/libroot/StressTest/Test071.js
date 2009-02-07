if (typeof StressTest.Test071 == 'function' && StressTest.Test071.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test071";
}

Class('StressTest.Test071', {
	use : [ 
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 71 }
	}
})
