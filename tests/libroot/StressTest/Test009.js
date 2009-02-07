if (typeof StressTest.Test009 == 'function' && StressTest.Test009.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test009";
}

Class('StressTest.Test009', {
	use : [ 
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test049',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092'
	   
	],
	
	methods : {
		result : function () { return 9 }
	}
})
