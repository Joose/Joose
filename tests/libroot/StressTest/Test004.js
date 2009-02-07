if (typeof StressTest.Test004 == 'function' && StressTest.Test004.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test004";
}

Class('StressTest.Test004', {
	use : [ 
	   
	       'StressTest.Test012',
	   
	       'StressTest.Test074',
	   
	       'StressTest.Test081'
	   
	],
	
	methods : {
		result : function () { return 4 }
	}
})
