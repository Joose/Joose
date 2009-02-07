if (typeof StressTest.Test002 == 'function' && StressTest.Test002.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test002";
}

Class('StressTest.Test002', {
	use : [ 
	   
	       'StressTest.Test007',
	   
	       'StressTest.Test024',
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test061',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 2 }
	}
})
