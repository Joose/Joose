if (typeof StressTest.Test082 == 'function' && StressTest.Test082.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test082";
}

Class('StressTest.Test082', {
	use : [ 
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 82 }
	}
})
