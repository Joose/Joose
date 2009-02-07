if (typeof StressTest.Test011 == 'function' && StressTest.Test011.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test011";
}

Class('StressTest.Test011', {
	use : [ 
	   
	       'StressTest.Test020',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test031',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test096'
	   
	],
	
	methods : {
		result : function () { return 11 }
	}
})
