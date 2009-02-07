if (typeof StressTest.Test089 == 'function' && StressTest.Test089.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test089";
}

Class('StressTest.Test089', {
	use : [ 
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 89 }
	}
})
