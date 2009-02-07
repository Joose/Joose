if (typeof StressTest.Test003 == 'function' && StressTest.Test003.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test003";
}

Class('StressTest.Test003', {
	use : [ 
	   
	       'StressTest.Test007',
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test081',
	   
	       'StressTest.Test086',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 3 }
	}
})
