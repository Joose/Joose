if (typeof StressTest.Test038 == 'function' && StressTest.Test038.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test038";
}

Class('StressTest.Test038', {
	use : [ 
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 38 }
	}
})
