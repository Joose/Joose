if (typeof StressTest.Test005 == 'function' && StressTest.Test005.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test005";
}

Class('StressTest.Test005', {
	use : [ 
	   
	       'StressTest.Test006',
	   
	       'StressTest.Test011',
	   
	       'StressTest.Test023',
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test036',
	   
	       'StressTest.Test045',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 5 }
	}
})
