if (typeof StressTest.Test001 == 'function' && StressTest.Test001.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test001";
}

Class('StressTest.Test001', {
	use : [ 
	   
	       'StressTest.Test006',
	   
	       'StressTest.Test026',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test084'
	   
	],
	
	methods : {
		result : function () { return 1 }
	}
})
