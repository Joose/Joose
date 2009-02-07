if (typeof StressTest.Test047 == 'function' && StressTest.Test047.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test047";
}

Class('StressTest.Test047', {
	use : [ 
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 47 }
	}
})
