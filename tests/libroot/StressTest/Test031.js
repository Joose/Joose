if (typeof StressTest.Test031 == 'function' && StressTest.Test031.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test031";
}

Class('StressTest.Test031', {
	use : [ 
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test041',
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 31 }
	}
})
