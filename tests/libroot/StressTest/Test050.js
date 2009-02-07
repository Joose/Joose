if (typeof StressTest.Test050 == 'function' && StressTest.Test050.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test050";
}

Class('StressTest.Test050', {
	use : [ 
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 50 }
	}
})
