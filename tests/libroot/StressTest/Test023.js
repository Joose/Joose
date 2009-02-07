if (typeof StressTest.Test023 == 'function' && StressTest.Test023.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test023";
}

Class('StressTest.Test023', {
	use : [ 
	   
	       'StressTest.Test026',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 23 }
	}
})
