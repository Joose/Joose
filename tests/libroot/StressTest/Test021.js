if (typeof StressTest.Test021 == 'function' && StressTest.Test021.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test021";
}

Class('StressTest.Test021', {
	use : [ 
	   
	       'StressTest.Test029',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test038',
	   
	       'StressTest.Test042',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test062',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 21 }
	}
})
