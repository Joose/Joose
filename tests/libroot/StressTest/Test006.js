if (typeof StressTest.Test006 == 'function' && StressTest.Test006.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test006";
}

Class('StressTest.Test006', {
	use : [ 
	   
	       'StressTest.Test012',
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test020',
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test039',
	   
	       'StressTest.Test047',
	   
	       'StressTest.Test054',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test072',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test088',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test097'
	   
	],
	
	methods : {
		result : function () { return 6 }
	}
})
