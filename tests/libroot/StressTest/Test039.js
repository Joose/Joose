if (typeof StressTest.Test039 == 'function' && StressTest.Test039.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test039";
}

Class('StressTest.Test039', {
	use : [ 
	   
	       'StressTest.Test042',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test058',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 39 }
	}
})
