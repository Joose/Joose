if (typeof StressTest.Test070 == 'function' && StressTest.Test070.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test070";
}

Class('StressTest.Test070', {
	use : [ 
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 70 }
	}
})
