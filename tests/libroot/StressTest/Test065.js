if (typeof StressTest.Test065 == 'function' && StressTest.Test065.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test065";
}

Class('StressTest.Test065', {
	use : [ 
	   
	       'StressTest.Test067',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test084',
	   
	       'StressTest.Test089',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test094',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 65 }
	}
})
