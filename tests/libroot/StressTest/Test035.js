if (typeof StressTest.Test035 == 'function' && StressTest.Test035.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test035";
}

Class('StressTest.Test035', {
	use : [ 
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test093'
	   
	],
	
	methods : {
		result : function () { return 35 }
	}
})
