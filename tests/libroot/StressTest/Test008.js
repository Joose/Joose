if (typeof StressTest.Test008 == 'function' && StressTest.Test008.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test008";
}

Class('StressTest.Test008', {
	use : [ 
	   
	       'StressTest.Test009',
	   
	       'StressTest.Test020',
	   
	       'StressTest.Test028',
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 8 }
	}
})
