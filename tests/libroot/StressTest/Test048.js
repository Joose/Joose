if (typeof StressTest.Test048 == 'function' && StressTest.Test048.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test048";
}

Class('StressTest.Test048', {
	use : [ 
	   
	       'StressTest.Test055',
	   
	       'StressTest.Test057',
	   
	       'StressTest.Test060',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test077',
	   
	       'StressTest.Test085',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 48 }
	}
})
