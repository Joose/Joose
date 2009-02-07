if (typeof StressTest.Test049 == 'function' && StressTest.Test049.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test049";
}

Class('StressTest.Test049', {
	use : [ 
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test095',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 49 }
	}
})
