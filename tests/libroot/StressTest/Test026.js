if (typeof StressTest.Test026 == 'function' && StressTest.Test026.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test026";
}

Class('StressTest.Test026', {
	use : [ 
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test041',
	   
	       'StressTest.Test045',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 26 }
	}
})
