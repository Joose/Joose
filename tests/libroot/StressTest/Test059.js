if (typeof StressTest.Test059 == 'function' && StressTest.Test059.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test059";
}

Class('StressTest.Test059', {
	use : [ 
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 59 }
	}
})
