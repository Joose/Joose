if (typeof StressTest.Test057 == 'function' && StressTest.Test057.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test057";
}

Class('StressTest.Test057', {
	use : [ 
	   
	       'StressTest.Test059',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test065',
	   
	       'StressTest.Test071',
	   
	       'StressTest.Test073',
	   
	       'StressTest.Test078',
	   
	       'StressTest.Test099'
	   
	],
	
	methods : {
		result : function () { return 57 }
	}
})
