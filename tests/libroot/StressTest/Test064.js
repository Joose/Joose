if (typeof StressTest.Test064 == 'function' && StressTest.Test064.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test064";
}

Class('StressTest.Test064', {
	use : [ 
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090'
	   
	],
	
	methods : {
		result : function () { return 64 }
	}
})
