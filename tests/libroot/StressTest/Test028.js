if (typeof StressTest.Test028 == 'function' && StressTest.Test028.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test028";
}

Class('StressTest.Test028', {
	use : [ 
	   
	       'StressTest.Test038',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test043',
	   
	       'StressTest.Test050',
	   
	       'StressTest.Test053',
	   
	       'StressTest.Test063',
	   
	       'StressTest.Test069',
	   
	       'StressTest.Test086'
	   
	],
	
	methods : {
		result : function () { return 28 }
	}
})
