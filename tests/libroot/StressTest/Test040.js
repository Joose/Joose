if (typeof StressTest.Test040 == 'function' && StressTest.Test040.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test040";
}

Class('StressTest.Test040', {
	use : [ 
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test083'
	   
	],
	
	methods : {
		result : function () { return 40 }
	}
})
