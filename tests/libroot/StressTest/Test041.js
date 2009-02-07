if (typeof StressTest.Test041 == 'function' && StressTest.Test041.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test041";
}

Class('StressTest.Test041', {
	use : [ 
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test082',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test094'
	   
	],
	
	methods : {
		result : function () { return 41 }
	}
})
