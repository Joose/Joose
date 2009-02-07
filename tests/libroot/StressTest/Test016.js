if (typeof StressTest.Test016 == 'function' && StressTest.Test016.meta.meta.isa(Joose.Class)) {
	StressTest.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test016";
}

Class('StressTest.Test016', {
	use : [ 
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test026',
	   
	       'StressTest.Test027',
	   
	       'StressTest.Test030',
	   
	       'StressTest.Test038',
	   
	       'StressTest.Test051',
	   
	       'StressTest.Test052',
	   
	       'StressTest.Test070',
	   
	       'StressTest.Test076',
	   
	       'StressTest.Test087'
	   
	],
	
	methods : {
		result : function () { return 16 }
	}
})
