if (typeof StressTest.Test053 == 'function' && StressTest.Test053.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test053";
}

Class('StressTest.Test053', {
	use : [ 
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test088'
	   
	],
	
	methods : {
		result : function () { return 53 }
	}
})
