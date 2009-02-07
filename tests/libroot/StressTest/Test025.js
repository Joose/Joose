if (typeof StressTest.Test025 == 'function' && StressTest.Test025.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test025";
}

Class('StressTest.Test025', {
	use : [ 
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 25 }
	}
})
