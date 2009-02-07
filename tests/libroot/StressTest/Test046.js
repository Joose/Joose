if (typeof StressTest.Test046 == 'function' && StressTest.Test046.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test046";
}

Class('StressTest.Test046', {
	use : [ 
	   
	       'StressTest.Test066',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087'
	   
	],
	
	methods : {
		result : function () { return 46 }
	}
})
