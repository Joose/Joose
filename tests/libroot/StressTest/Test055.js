if (typeof StressTest.Test055 == 'function' && StressTest.Test055.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test055";
}

Class('StressTest.Test055', {
	use : [ 
	   
	       'StressTest.Test056',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test088'
	   
	],
	
	methods : {
		result : function () { return 55 }
	}
})
