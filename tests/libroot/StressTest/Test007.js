if (typeof StressTest.Test007 == 'function' && StressTest.Test007.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test007";
}

Class('StressTest.Test007', {
	use : [ 
	   
	       'StressTest.Test014',
	   
	       'StressTest.Test020',
	   
	       'StressTest.Test021',
	   
	       'StressTest.Test048',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test081'
	   
	],
	
	methods : {
		result : function () { return 7 }
	}
})
