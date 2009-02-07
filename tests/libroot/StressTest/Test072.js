if (typeof StressTest.Test072 == 'function' && StressTest.Test072.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test072";
}

Class('StressTest.Test072', {
	use : [ 
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test083',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test096',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test098',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 72 }
	}
})
