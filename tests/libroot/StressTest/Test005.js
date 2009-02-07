if (typeof StressTest.Test005 == 'function') {
	StressTest000.doubleDeclarations = true;
	throw "Double declaration of StressTest.Test005";
}
//if (typeof StressTest.Test005 == 'function') throw "Double declaration of StressTest.Test005";

Class('StressTest.Test005', {
	use : [ 
	   
	       'StressTest.Test016',
	   
	       'StressTest.Test017',
	   
	       'StressTest.Test032',
	   
	       'StressTest.Test034',
	   
	       'StressTest.Test040',
	   
	       'StressTest.Test046',
	   
	       'StressTest.Test064',
	   
	       'StressTest.Test087',
	   
	       'StressTest.Test090',
	   
	       'StressTest.Test092',
	   
	       'StressTest.Test093',
	   
	       'StressTest.Test100'
	   
	],
	
	methods : {
		result : function () { return 5 }
	}
})
