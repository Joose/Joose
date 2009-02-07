if (typeof StressTest.Test045 == 'function' && StressTest.Test045.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test045";
}

Class('StressTest.Test045', {
	use : [ 
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test091',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 45 }
	}
})
