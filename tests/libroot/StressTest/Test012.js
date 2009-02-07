if (typeof StressTest.Test012 == 'function' && StressTest.Test012.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test012";
}

Class('StressTest.Test012', {
	use : [ 
	   
	       'StressTest.Test019',
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test035',
	   
	       'StressTest.Test037',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test079'
	   
	],
	
	methods : {
		result : function () { return 12 }
	}
})
