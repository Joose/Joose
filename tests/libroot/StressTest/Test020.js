if (typeof StressTest.Test020 == 'function' && StressTest.Test020.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test020";
}

Class('StressTest.Test020', {
	use : [ 
	   
	       'StressTest.Test033',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090'
	   
	],
	
	methods : {
		result : function () { return 20 }
	}
})
