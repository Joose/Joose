if (typeof StressTest.Test018 == 'function' && StressTest.Test018.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test018";
}

Class('StressTest.Test018', {
	use : [ 
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test037',
	   
	       'StressTest.Test044',
	   
	       'StressTest.Test080',
	   
	       'StressTest.Test089'
	   
	],
	
	methods : {
		result : function () { return 18 }
	}
})
