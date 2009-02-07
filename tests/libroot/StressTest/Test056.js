if (typeof StressTest.Test056 == 'function' && StressTest.Test056.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test056";
}

Class('StressTest.Test056', {
	use : [ 
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 56 }
	}
})
