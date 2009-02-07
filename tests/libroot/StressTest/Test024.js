if (typeof StressTest.Test024 == 'function' && StressTest.Test024.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test024";
}

Class('StressTest.Test024', {
	use : [ 
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test035',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 24 }
	}
})
