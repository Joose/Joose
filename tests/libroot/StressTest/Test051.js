if (typeof StressTest.Test051 == 'function' && StressTest.Test051.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test051";
}

Class('StressTest.Test051', {
	use : [ 
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test068',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test075',
	   
	       'StressTest.Test079',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test098'
	   
	],
	
	methods : {
		result : function () { return 51 }
	}
})
