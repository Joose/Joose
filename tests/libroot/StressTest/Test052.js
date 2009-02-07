if (typeof StressTest.Test052 == 'function' && StressTest.Test052.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test052";
}

Class('StressTest.Test052', {
	use : [ 
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 52 }
	}
})
