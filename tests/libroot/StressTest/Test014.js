if (typeof StressTest.Test014 == 'function' && StressTest.Test014.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test014";
}

Class('StressTest.Test014', {
	use : [ 
	   
	       'StressTest.Test015',
	   
	       'StressTest.Test028',
	   
	       'StressTest.Test037',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test074'
	   
	],
	
	methods : {
		result : function () { return 14 }
	}
})
