if (typeof StressTest.Test084 == 'function' && StressTest.Test084.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test084";
}

Class('StressTest.Test084', {
	use : [ 
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 84 }
	}
})
