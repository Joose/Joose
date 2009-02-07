if (typeof StressTest.Test087 == 'function' && StressTest.Test087.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test087";
}

Class('StressTest.Test087', {
	use : [ 
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 87 }
	}
})
