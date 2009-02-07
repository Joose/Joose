if (typeof StressTest.Test062 == 'function' && StressTest.Test062.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test062";
}

Class('StressTest.Test062', {
	use : [ 
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test097',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 62 }
	}
})
